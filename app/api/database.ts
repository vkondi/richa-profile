import path from "path";
import sqlite3, { Database } from "better-sqlite3";
import { migrate } from "./migration";

// Use /tmp in serverless environments (like Vercel)
const isServerless = process.env.NEXT_RUNTIME === "edge" || process.env.VERCEL;
export const dbPath = isServerless
  ? "/tmp/richa_portfolio.db"
  : path.join(process.cwd(), "richa_portfolio.db");

let db: Database;

try {
  db = new sqlite3(dbPath, { fileMustExist: false }); // Creates DB if it doesn't exist
  console.log(`Connected to database at: ${dbPath}`);

  migrate(); // Run migrations after successful connection
} catch (error) {
  console.error("Database connection error:", error);
  process.exit(1); // Exit the process if the database fails to connect
}

export { db };
