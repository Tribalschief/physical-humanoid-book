from qdrant_client import QdrantClient
import inspect

client = QdrantClient(":memory:")
print(inspect.signature(client.query_points))
