# The Simple Deployment Guide

This project has **3 separate parts** that need to be online. Think of them as three different websites talking to each other.

---

## Part 1: The Brain (Backend)
**What is it?**: The Python/FastAPI code that talks to Gemini and Qdrant.
**Where to put it?**: **Render** or **Railway**.
**Why?**: These platforms support Docker (which runs Python) for free/cheap.

**Action Steps**:
1.  Create a "Web Service" on Render/Railway.
2.  Point it to your GitHub repo's `/backend` folder.
3.  Add your API Keys (`GEMINI_API_KEY`, etc.) in the dashboard settings.
4.  **Result**: You get a URL like `https://my-backend.onrender.com`.

---

## Part 2: The Gatekeeper (Auth Server)
**What is it?**: The Node.js server that handles Sign Up/Login.
**Where to put it?**: **Render** or **Railway** (same place as backend usually).

**Action Steps**:
1.  Create another "Web Service".
2.  Point it to your GitHub repo's `/auth-server` folder.
3.  Add the `BETTER_AUTH_URL` setting (which is its own new URL).
4.  **Result**: You get a URL like `https://my-auth.onrender.com`.

---

## Part 3: The Face (Frontend)
**What is it?**: The React/Docusaurus website users actually see.
**Where to put it?**: **Vercel** (Best for React).

**Action Steps**:
1.  **Crucial Step**: Take the URLs from Part 1 & Part 2.
2.  Open `src/config.ts` in your code.
3.  Paste those URLs there so the Frontend knows where to send messages.
4.  Push that change to GitHub.
5.  Go to **Vercel**, import the project, and hit Deploy.
6.  **Result**: Your site is live at `https://my-project.vercel.app`.

---

## Summary of the Flow
1.  User visits **Vercel URL** (Frontend).
2.  Frontend checks `config.ts` to find the Backend.
3.  Frontend sends chat message to **Render URL** (Backend).
4.  Backend replies.

**That's it! You are connecting 3 distinctive dots on the internet.**
