import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import { auth } from "./auth";

const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// SQLite database for user profiles (separate from better-auth's tables)
const db = new Database("auth.db");

// Create user_profiles table for storing background info
db.exec(`
    CREATE TABLE IF NOT EXISTS user_profiles (
        user_id TEXT PRIMARY KEY,
        email TEXT,
        name TEXT,
        software_background TEXT,
        hardware_background TEXT,
        experience_level TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
`);

const PORT = 4000;

app.get("/", (req, res) => {
    res.send("Auth Server is running with Better Auth");
});

// Signup endpoint with background questions
app.post("/api/auth/signup", async (req, res) => {
    const { email, password, name, softwareBackground, hardwareBackground, experienceLevel } = req.body;

    try {
        // 1. Create user with better-auth
        const result = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: name || email.split('@')[0],
            }
        });

        // 2. Store user profile with background info
        const insertProfile = db.prepare(`
            INSERT OR REPLACE INTO user_profiles 
            (user_id, email, name, software_background, hardware_background, experience_level)
            VALUES (?, ?, ?, ?, ?, ?)
        `);

        insertProfile.run(
            result.user.id,
            email,
            name || email.split('@')[0],
            softwareBackground || '',
            hardwareBackground || '',
            experienceLevel || 'beginner'
        );

        console.log(`User ${email} signed up with:`, {
            softwareBackground,
            hardwareBackground,
            experienceLevel
        });

        res.json({
            success: true,
            user: {
                id: result.user.id,
                email: result.user.email,
                name: name || email.split('@')[0],
                softwareBackground,
                hardwareBackground,
                experienceLevel
            },
            token: result.token || `token-${result.user.id}`
        });
    } catch (e: any) {
        console.error("Signup Error:", e);
        res.status(400).json({
            success: false,
            error: e.body?.message || e.message || "Signup failed"
        });
    }
});

// Signin endpoint
app.post("/api/auth/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const data = await auth.api.signInEmail({
            body: { email, password }
        });

        // Fetch user profile
        const getProfile = db.prepare(`
            SELECT * FROM user_profiles WHERE email = ?
        `);
        const profile = getProfile.get(email) as any;

        res.json({
            success: true,
            user: {
                id: data.user.id,
                email: data.user.email,
                name: profile?.name || email.split('@')[0],
                softwareBackground: profile?.software_background || '',
                hardwareBackground: profile?.hardware_background || '',
                experienceLevel: profile?.experience_level || 'beginner'
            },
            token: data.token || `token-${data.user.id}`
        });
    } catch (e: any) {
        console.error("Signin Error:", e);
        res.status(401).json({
            success: false,
            error: "Invalid credentials"
        });
    }
});

// Get user profile endpoint
app.get("/api/auth/profile/:userId", async (req, res) => {
    try {
        const getProfile = db.prepare(`
            SELECT * FROM user_profiles WHERE user_id = ?
        `);
        const profile = getProfile.get(req.params.userId);

        if (profile) {
            res.json({ success: true, profile });
        } else {
            res.status(404).json({ success: false, error: "Profile not found" });
        }
    } catch (e: any) {
        res.status(500).json({ success: false, error: e.message });
    }
});

// Update user profile endpoint
app.put("/api/auth/profile/:userId", async (req, res) => {
    const { softwareBackground, hardwareBackground, experienceLevel } = req.body;

    try {
        const updateProfile = db.prepare(`
            UPDATE user_profiles 
            SET software_background = ?, hardware_background = ?, experience_level = ?
            WHERE user_id = ?
        `);

        updateProfile.run(
            softwareBackground,
            hardwareBackground,
            experienceLevel,
            req.params.userId
        );

        res.json({ success: true, message: "Profile updated" });
    } catch (e: any) {
        res.status(500).json({ success: false, error: e.message });
    }
});

app.listen(PORT, () => {
    console.log(`Auth Server listening on port ${PORT}`);
    console.log("Database tables initialized");
});
