import { Pool } from "pg";
import { migrate } from "./migration";

const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Neon
};

// Create a connection pool
const pool = new Pool(dbConfig);

pool.on("connect", () => {
  console.log("Connected to Neon (PostgreSQL) database!");
});

pool.on("error", (err) => {
  console.error("❌ Database connection error:", err);
});

// Global flag to ensure migration runs only once
let isInitialized = false;

const initDatabase = async () => {
  if (!isInitialized) {
    console.log("Running database migrations...");
    await migrate();
    isInitialized = true;
    console.log("Database migrations complete.");
  }
};

initDatabase(); // Run when server starts

export { pool };
