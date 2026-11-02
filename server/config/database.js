require("dotenv").config();

const { Pool } = require("pg");

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  ssl: process.env.DB_SSL === "true"
    ? { rejectUnauthorized: true }
    : false
});

module.exports = pool;