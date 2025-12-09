# AI Agent Skills & Reusable Intelligence

This project leverages "Agent Skills" to automate the creation and maintenance of the textbook.

## Skills

### 1. Curriculum Generator (`generate_content.py`)
**Role**: Content Architect Agent
**Description**: Reads the structured syllabus from `syllabus_data.json` (The Spec) and generates the Docusaurus compatible Markdown files. It automatically injects interactive components (Personalization/Translation buttons) into every chapter.
**Usage**: `python generate_content.py`

### 2. Knowledge Ingestor (`backend/ingest.py`)
**Role**: Knowledge Librarian Agent
**Description**: Scans the generated book content, chunks it into semantic segments, and prepares it for Vector Database ingestion (Qdrant). This enables the RAG Chatbot to answer questions based on the latest version of the book.
**Usage**: `python backend/ingest.py`

## Automation Workflow
1. Update `syllabus_data.json` with new modules.
2. Run `Curriculum Generator`.
3. Run `Knowledge Ingestor`.
4. Deploy.
