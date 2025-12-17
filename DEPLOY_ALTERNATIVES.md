# Deploying to Railway (Recommended Alternative)

**Railway.app** is a robust alternative to Render. It is often faster to build and easier to manage multiple services (Backend + Auth) in one project dashboard.

## Why Railway?
*   **Automatic Docker Support**: It reads your `Dockerfile`s instantly.
*   **Shared Project View**: You see your Backend, Auth, and Database in one canvas.
*   **Trial Credit**: They provide credit to start for free.

---

## Step 1: Push Code
Ensure your code is pushed to GitHub `main` branch.

## Step 2: Create Railway Project
1.  Sign up at [Railway.app](https://railway.app/).
2.  Click **New Project** -> **Deploy from GitHub repo**.
3.  Select your `physical-humanoid-book` repo.
4.  **IMPORTANT**: Railway will try to deploy the root. We need to split this into two services.

Since your repo is a "Monorepo" (multiple apps in one folder), you deploy the same repo **twice** but change the "Root Directory".

### Service A: Setup Backend
1.  Click settings on the newly created service.
2.  **Root Directory**: Change to `/backend`.
3.  **Variables**: Add your ENV vars:
    *   `GEMINI_API_KEY`: (Your Key)
    *   `QDRANT_URL`: (Your URL)
    *   `QDRANT_API_KEY`: (Your Key)
    *   `PORT`: `8000` (Railway sets this, but your Dockerfile uses 8000. Railway usually overrides or maps it. Ensure your Dockerfile `CMD` uses the `$PORT` variable if possible, or just configure Railway to listen on 8000).
    *   *Note: In Railway Settings -> Networking, set the Port to 8000.*
4.  Railway generates a public domain (e.g., `backend-production.up.railway.app`). **Copy this**.

### Service B: Setup Auth Server
1.  In the same project, click **New** -> **GitHub Repo** -> Select the same repo again.
2.  Go to Settings for this new service.
3.  **Root Directory**: Change to `/auth-server`.
4.  **Variables**:
    *   `BETTER_AUTH_SECRET`: (Random String)
    *   `BETTER_AUTH_URL`: (The public domain Railway gives you, e.g. `https://auth-production.up.railway.app`)
5.  **Networking**: Set Port to `4000`.
6.  **Copy the Domain**.

---

## Step 3: Persistence (The Database Issue)
*   **Warning**: Like Render, Railway's filesystem is ephemeral. If you restart the Auth Server, `auth.db` (SQLite) will be deleted.
*   **Solution for Hackathon**: It is fine for demos.
*   **Solution for Real App**: In Railway, right-click the canvas -> **New** -> **Database** -> **PostgreSQL**. Then update your Auth Server code to use Postgres instead of SQLite (requires code changes).

---

## Step 4: Update Frontend
1.  Go to `physical-ai-book/src/config.ts`.
2.  Update the URLs with your new Railway domains.
    ```typescript
    return 'https://backend-production.up.railway.app';
    return 'https://auth-production.up.railway.app';
    ```
3.  Push changes to GitHub.
4.  Vercel (if connected) will auto-redeploy your Frontend.

---

# Alternative 2: Hugging Face Spaces (Best for Python/AI Backend)

If you only want to host the Python Backend for free:

1.  Go to [huggingface.co/spaces](https://huggingface.co/spaces).
2.  Create New Space -> Name: `physical-ai-backend`.
3.  Sdk: **Docker**.
4.  Drag and drop your `backend` folder files (or connect GitHub).
5.  Set Secrets in Settings (`GEMINI_API_KEY`, etc.).
6.  HF Spaces provides a permanent HTTPS URL.
