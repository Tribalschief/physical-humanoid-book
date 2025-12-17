# Production Deployment Guide

Since you are not using Docker in production (due to GitHub Pages limitations and Vercel preferences), we will use a **Hybrid Deployment Strategy**:

1.  **Frontend**: Deployed to **Vercel** (Recommended) or GitHub Pages.
2.  **Backend & Auth**: Deployed to **Render.com** (Free, supports Docker/Python/Node).

---

## Part 1: Prepare Codebase

All hardcoded `localhost` URLs have been replaced with a dynamic configuration in `physical-ai-book/src/config.ts`.
**IMPORTANT**: Once you deploy the backend, you MUST update `src/config.ts` with the new URLs.

```typescript
// src/config.ts
export const getApiUrl = () => {
  // ...
  return 'https://your-backend-app.onrender.com'; // <--- Update this after deploying backend
};
// same for Auth URL
```

---

## Part 2: Deploy Backend & Auth (on Render.com)

We will use Render because it allows Docker containers and persistent disks (for SQLite), which Vercel does not easily support for this stack.

1.  **Push your code to GitHub** (if not already).
2.  **Sign up for [Render.com](https://render.com/)**.
3.  **Deploy Backend**:
    *   Click **New +** -> **Web Service**.
    *   Connect your GitHub repo.
    *   **Root Directory**: `backend`
    *   **Runtime**: Docker
    *   **Instance Type**: Free
    *   **Environment Variables**:
        *   `GEMINI_API_KEY`: (Your Key)
        *   `QDRANT_URL`: (Your URL)
        *   `QDRANT_API_KEY`: (Your Key)
    *   Click **Create Web Service**.
    *   **Copy the URL** (e.g., `https://hackathon-backend-xyz.onrender.com`).

4.  **Deploy Auth Server**:
    *   Click **New +** -> **Web Service**.
    *   Connect your GitHub repo.
    *   **Root Directory**: `auth-server`
    *   **Runtime**: Docker
    *   **Instance Type**: Free (Note: On free tier, SQLite data resets on deploy. For persistence, upgrade to use a Disk or use an external DB like Turso/Neon).
    *   **Environment Variables**:
        *   `BETTER_AUTH_SECRET`: (Generate a random string)
        *   `BETTER_AUTH_URL`: (The URL Render gives you, e.g., `https://hackathon-auth-xyz.onrender.com`)
    *   Click **Create Web Service**.
    *   **Copy the URL** (e.g., `https://hackathon-auth-xyz.onrender.com`).

---

## Part 3: Update Frontend Config

1.  Open `d:\python-practice\hackathon project\physical-ai-book\src\config.ts`.
2.  Paste the **Backend URL** and **Auth URL** you obtained from Render.
3.  Commit and push changes to GitHub.

---

## Part 4: Deploy Frontend (Vercel)

1.  **Sign up for [Vercel](https://vercel.com/)**.
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repo.
4.  **Root Directory**: Edit and select `physical-ai-book`.
5.  **Build Command**: `npm run build` (default).
6.  **Output Directory**: `build` (default for Docusaurus).
7.  Click **Deploy**.

Vercel will build your site and give you a production URL (e.g., `https://physical-ai-book.vercel.app`).
**Done!** Your full stack app is now live.

### Setup for GitHub Pages (Alternative)

If you prefer GitHub Pages for frontend:
1.  Open `docusaurus.config.ts`.
2.  Set `url` to `https://Tribalschief.github.io`.
3.  Set `baseUrl` to `/physical-humanoid-book/`.
4.  Run `npm run deploy` inside `physical-ai-book` folder (requires SSH/Git setup).

*Vercel is generally easier for React apps configuration.*
