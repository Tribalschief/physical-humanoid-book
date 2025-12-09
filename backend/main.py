from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os
from dotenv import load_dotenv
from openai import AsyncOpenAI

# Load environment variables
load_dotenv()

app = FastAPI(title="Physical AI Textbook RAG API")

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gemini client via OpenAI SDK Compatibility
openai_client = AsyncOpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

# Qdrant client (optional - only if configured)
q_client = None
COLLECTION_NAME = "textbook_content"
EMBEDDING_MODEL = "text-embedding-004"

try:
    from qdrant_client import QdrantClient
    qdrant_url = os.getenv("QDRANT_URL")
    qdrant_key = os.getenv("QDRANT_API_KEY")
    if qdrant_url and qdrant_key:
        q_client = QdrantClient(url=qdrant_url, api_key=qdrant_key, timeout=10)
        print("Qdrant client initialized")
except Exception as e:
    print(f"Qdrant initialization skipped: {e}")

class ChatRequest(BaseModel):
    message: str
    user_id: Optional[str] = None
    context_text: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    sources: List[str] = []

@app.get("/")
def read_root():
    return {"message": "Physical AI Textbook API is running", "qdrant": q_client is not None}

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """RAG Chat Endpoint."""
    try:
        context_str = ""
        sources = []
        
        # Try RAG search if Qdrant is available
        if q_client:
            try:
                # Embed query
                embedding_resp = await openai_client.embeddings.create(
                    input=request.message,
                    model=EMBEDDING_MODEL
                )
                query_vector = embedding_resp.data[0].embedding

                # Search Qdrant
                search_results = q_client.query_points(
                    collection_name=COLLECTION_NAME,
                    query=query_vector,
                    limit=3
                ).points

                for hit in search_results:
                    context_str += f"---\nSource: {hit.payload.get('source', 'Unknown')}\nContent: {hit.payload.get('content', '')}\n"
                    sources.append(hit.payload.get('source', 'Unknown'))
            except Exception as qdrant_err:
                print(f"Qdrant search error (continuing without RAG): {qdrant_err}")

        # Add user-selected text if provided
        if request.context_text:
            context_str = f"USER HIGHLIGHTED TEXT:\n{request.context_text}\n\n" + context_str

        # Build system prompt
        if context_str:
            system_prompt = """You are an enthusiastic AI Teaching Assistant for the 'Physical AI & Humanoid Robotics' textbook. 
            Answer the user's question based on the provided context. 
            If the answer is not in the context, provide helpful general information about robotics.
            Be concise but thorough. Use code examples where relevant."""
            user_content = f"Context:\n{context_str}\n\nQuestion: {request.message}"
        else:
            system_prompt = """You are an enthusiastic AI Teaching Assistant for Physical AI & Humanoid Robotics.
            You help students learn about ROS 2, Isaac Sim, URDF, robot kinematics, and AI integration with robotics.
            Be helpful, educational, and provide code examples when relevant."""
            user_content = request.message

        # Generate response
        completion = await openai_client.chat.completions.create(
            model="gemini-flash-latest",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_content}
            ]
        )

        return ChatResponse(
            response=completion.choices[0].message.content,
            sources=list(set(sources)) if sources else []
        )
    except Exception as e:
        print(f"Chat API Error: {e}")
        if "429" in str(e):
            return ChatResponse(response="Rate limit exceeded. Please wait 30 seconds and try again.", sources=[])
        return ChatResponse(response=f"I'm having trouble connecting. Error: {str(e)[:100]}", sources=[])


class PersonalizationRequest(BaseModel):
    content: str
    user_background: str

@app.post("/api/personalize")
async def personalize_content(request: PersonalizationRequest):
    """Personalizes textbook content based on user's background."""
    try:
        system_prompt = f"""You are adapting technical content for a reader with background: {request.user_background}.
        
        For beginners: Use simpler language, more analogies, avoid jargon.
        For software engineers: Relate concepts to software patterns they know.
        For researchers: Be more technical, include paper references style.
        
        Rewrite the following content appropriately."""

        completion = await openai_client.chat.completions.create(
            model="gemini-flash-latest",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.content}
            ]
        )
        return {"status": "success", "personalized_text": completion.choices[0].message.content}
    except Exception as e:
        print(f"Personalization API Error: {e}")
        if "429" in str(e):
            return {"status": "error", "personalized_text": "Rate limit exceeded. Please try again later."}
        return {"status": "error", "personalized_text": f"Could not personalize: {str(e)[:100]}"}


class TranslateRequest(BaseModel):
    text: str

@app.post("/api/translate")
async def translate_content(request: TranslateRequest):
    """Translates text to Urdu."""
    try:
        completion = await openai_client.chat.completions.create(
            model="gemini-flash-latest",
            messages=[
                {"role": "system", "content": "You are a translator. Translate the technical text to Urdu script. Keep technical terms in English where appropriate."},
                {"role": "user", "content": request.text}
            ]
        )
        return {"translated_text": completion.choices[0].message.content}
    except Exception as e:
        print(f"Translation API Error: {e}")
        if "429" in str(e):
            return {"translated_text": "[Error] Rate limit. Try again in 30 seconds."}
        return {"translated_text": f"[Error] {str(e)[:100]}"}
