# Deployment Guide

This project is configured to be deployed using **Docker Compose**, which orchestrates the Frontend, Auth Server, and Backend to run together as they would in a production environment.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

## Setup

1.  **Environment Variables**:
    Create a `.env` file in the root directory (`d:\python-practice\hackathon project\.env`) and add your API keys. You can copy them from `backend/.env` if they are there.

    ```env
    GEMINI_API_KEY=your_gemini_key
    QDRANT_URL=your_qdrant_url
    QDRANT_API_KEY=your_qdrant_key
    # Add any other keys needed for auth-server if applicable
    ```

2.  **Frontend Configuration**:
    Note: The `physical-ai-book` (Docusaurus) is configured with `baseUrl: '/physical-humanoid-book/'`.
    When running via Docker on `localhost:3000`, you will likely need to access it at:
    [http://localhost:3000/physical-humanoid-book/](http://localhost:3000/physical-humanoid-book/)

    If you want it at the root (`http://localhost:3000/`), update `docusaurus.config.ts`:
    ```typescript
    baseUrl: '/',
    ```

## Running the Application

1.  Open a terminal in the project root.
2.  Run the following command to build and start all services:

    ```bash
    docker-compose up --build
    ```

    *The `--build` flag ensures that the images are rebuilt with your latest code.*

3.  Access the services:
    - **Frontend**: [http://localhost:3000/physical-humanoid-book/](http://localhost:3000/physical-humanoid-book/) (or just / if you changed baseUrl)
    - **Auth Server**: [http://localhost:4000](http://localhost:4000)
    - **Backend API**: [http://localhost:8000](http://localhost:8000) / [http://localhost:8000/docs](http://localhost:8000/docs)

## Stopping

Press `Ctrl+C` in the terminal or run:
```bash
docker-compose down
```
