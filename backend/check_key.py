import os
from dotenv import load_dotenv
from openai import OpenAI
import sys

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
print(f"Key found: {api_key}")

try:
    client = OpenAI(
        api_key=api_key,
        base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
    )
    print("Sending request...")
    response = client.chat.completions.create(
        model="gemini-1.5-flash-latest",
        messages=[{"role": "user", "content": "Hello"}],
        timeout=10.0
    )
    print("Response received:")
    print(response.choices[0].message.content)
except Exception as e:
    print(f"Error: {e}")
