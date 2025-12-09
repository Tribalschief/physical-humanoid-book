import os
import urllib.request
import json
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"

try:
    with urllib.request.urlopen(url) as response:
        if response.status == 200:
            data = json.loads(response.read().decode())
            models = data.get('models', [])
            print("Available models:")
            for m in models:
                print(m['name'])
        else:
            print(f"Error listing models: {response.status} {response.read().decode()}")
except Exception as e:
    print(f"Exception: {e}")
