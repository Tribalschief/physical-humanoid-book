import os
import glob
import time
from dotenv import load_dotenv
from openai import OpenAI
from qdrant_client import QdrantClient, models
from qdrant_client.http.models import Distance, VectorParams

load_dotenv()

# Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
COLLECTION_NAME = "textbook_content"

if not GEMINI_API_KEY:
    print("WARNING: GEMINI_API_KEY not found. Ingestion will fail.")

client = OpenAI(
    api_key=GEMINI_API_KEY,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)
qdrant = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

def load_docs(docs_path):
    documents = []
    files = glob.glob(os.path.join(docs_path, "**/*.md"), recursive=True)
    
    for f_path in files:
        with open(f_path, "r", encoding="utf-8") as f:
            content = f.read()
            # Simple metadata extraction
            filename = os.path.basename(f_path)
            documents.append({
                "source": filename,
                "content": content
            })
    return documents

def chunk_text(text, chunk_size=1000, overlap=100):
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start += (chunk_size - overlap)
    return chunks

def get_embedding(text):
    response = client.embeddings.create(
        input=text,
        model="text-embedding-004"
    )
    return response.data[0].embedding

def setup_collection():
    try:
        qdrant.get_collection(COLLECTION_NAME)
        print(f"Collection {COLLECTION_NAME} exists.")
    except:
        print(f"Creating collection {COLLECTION_NAME}...")
        qdrant.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(size=768, distance=Distance.COSINE),
        )

def main():
    if not GEMINI_API_KEY:
        print("Skipping ingestion due to missing API Key.")
        return

    docs_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "physical-ai-book", "docs")
    print(f"Scanning for docs in: {docs_dir}")
    
    docs = load_docs(docs_dir)
    print(f"Found {len(docs)} documents.")
    
    setup_collection()
    
    total_chunks = 0
    points = []
    
    for doc in docs:
        chunks = chunk_text(doc["content"])
        for i, chunk in enumerate(chunks):
            print(f"Embedding chunk {i} of {doc['source']}...")
            try:
                vector = get_embedding(chunk)
                points.append(models.PointStruct(
                    id=total_chunks,
                    vector=vector,
                    payload={
                        "source": doc["source"],
                        "content": chunk
                    }
                ))
                total_chunks += 1
            except Exception as e:
                print(f"Error embedding chunk: {e}")
                time.sleep(1)

    if points:
        print(f"Upserting {len(points)} points to Qdrant...")
        qdrant.upsert(
            collection_name=COLLECTION_NAME,
            points=points
        )
        print("Ingestion complete!")
    else:
        print("No points to ingest.")

if __name__ == "__main__":
    main()
