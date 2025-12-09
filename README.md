# Physical AI & Humanoid Robotics Textbook

## Project Overview
A unified interactive textbook project built with Docusaurus and powered by a RAG AI Agent.

## Setup Instructions

### 1. Frontend (Book)
Navigate to the book directory and install dependencies:
```bash
cd physical-ai-book
npm install
npm run start
```
The book will be available at http://localhost:3000.

### 2. Backend (Actual RAG Agent)
Navigate to the backend directory:
```bash
# Set up your .env file with GEMINI_API_KEY and QDRANT_URL/KEY
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
The API will be available at http://localhost:8000.

To ingest the book content into the vector database:
```bash
python ingest.py
```

### 3. Auth Server (Bonus Feature)
To enable the "Sign Up" and "Personalize" features (Better Auth Mock):
```bash
cd auth-server
npm install
npm start
```
(Ensure you add a script `"start": "tsx server.ts"` to `auth-server/package.json` or run `npx tsx server.ts`)

## Features
- **Spec-Driven Content**: Content is generated from a JSON specification.
- **RAG Chatbot**: Context-aware AI assistant embedded in the book (Real OpenAI + Qdrant integration).
- **Interactive Tools**: 
    - **Personalization**: Adjusts content based on user background (Requires Login).
    - **Translation**: Translate content to Urdu.
- **Auth**: Working Signup/Signin Widget.

## Architecture
- **Frontend**: React (Docusaurus)
- **Backend**: FastAPI (Python)
- **Vectors**: Qdrant
- **LLM**: Google Gemini (via OpenAI SDK Compat)
- **Auth**: Express/Node (simulating Better Auth for Hackathon)
