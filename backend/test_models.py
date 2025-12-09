import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

# Test different model names
models_to_try = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest", 
    "gemini-flash-latest",
    "models/gemini-1.5-flash",
    "gemini-1.5-flash-001",
    "gemini-1.5-flash-002",
]

for model in models_to_try:
    print(f"\nTrying: {model}")
    try:
        response = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": "Say hi"}],
            max_tokens=10
        )
        print(f"  ✅ SUCCESS! Response: {response.choices[0].message.content}")
        break
    except Exception as e:
        error_msg = str(e)[:100]
        print(f"  ❌ Failed: {error_msg}")
