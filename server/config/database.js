require("dotenv").config();

const { Pool } = require("pg");

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is missing");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: true } : false,

  connectionTimeoutMillis: 10000,

  idleTimeoutMillis: 30000,

  max: 5,
});

// Handle unexpected errors from idle connections
pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL connection error:", error);
});

module.exports = pool;