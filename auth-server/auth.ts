
import { betterAuth } from "better-auth";
import { bearer } from "better-auth/plugins";
import Database from "better-sqlite3";

// Setup SQLite Database
const db = new Database("auth.db");

// Initialize Better Auth
export const auth = betterAuth({
    database: db,
    emailAndPassword: {
        enabled: true
    },
    plugins: [
        bearer()
    ]
});
