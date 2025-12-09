import urllib.request
import json

api_key = "AIzaSyBVZkimqGOeYQCBaQLjCF8bu1O-5sSH7_U"
url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"

try:
    with urllib.request.urlopen(url, timeout=30) as response:
        data = json.loads(response.read().decode())
        models = data.get('models', [])
        print(f"Found {len(models)} models")
        print("\nLooking for gemini-1.5 models:")
        for m in models:
            name = m['name']
            if '1.5' in name or 'flash' in name.lower():
                print(f"  {name}")
except Exception as e:
    print(f"Error: {e}")
