from qdrant_client import QdrantClient
import inspect

try:
    print("Checking QdrantClient attributes...")
    client = QdrantClient(":memory:")
    print(f"Has 'search': {hasattr(client, 'search')}")
    print(f"Has 'query_points': {hasattr(client, 'query_points')}")
    print("Methods:", [m for m in dir(client) if not m.startswith("_")])
except Exception as e:
    print(f"Error: {e}")
