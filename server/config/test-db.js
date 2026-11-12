const pool = require("./database");

async function testDatabase() {
  try {
    const result = await pool.query("SELECT * FROM ideas ORDER BY id");

    console.log("Database connection successful!");

    console.table(result.rows);
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    await pool.end();
  }
}

testDatabase();