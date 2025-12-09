# Implementation Plan

## Phase 1: Foundation & Content (Current Focus)
1.  [x] Initialize Docusaurus Project (`physical-ai-book`).
2.  [ ] Configure Docusaurus (Sidebar, Theme, Title).
3.  [ ] Create Content Structure (Markdown files for Modules).
4.  [ ] Populate initial content for Chapters based on the syllabus.
5.  [ ] Customize Landing Page.

## Phase 2: Backend & RAG API
1.  [ ] Initialize FastAPI project (`backend`).
2.  [ ] Create RAG Service skeleton (Ingestion & Query APIs).
3.  [ ] Setup Qdrant & OpenAI client stubs (requires API keys, will mock for demo if needed).

## Phase 3: Integration & Features
1.  [ ] Build `ChatbotWidget` React component in Docusaurus.
2.  [ ] Connect Chatbot to Backend.
3.  [ ] Implement `PersonalizeButton` and `TranslateButton` components.
    *   *Note*: Real-time translation/personalization requires LLM calls. We will implement the UI and handlers.
4.  [ ] Implement Auth UI (Better-Auth integration plan).

## Phase 4: Polish & Deployment
1.  [ ] Review Text and UI.
2.  [ ] Create Build Scripts.
