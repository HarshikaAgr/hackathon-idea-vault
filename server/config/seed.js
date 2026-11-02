require("dotenv").config();

const pool = require("./database");

// Import original Unit 1 project data
const ideas = require("../../data/ideas");


async function seedDatabase() {

  try {

    console.log("Connecting to PostgreSQL...");


    // STEP 1: Create the table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ideas (
        id INTEGER PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        description TEXT NOT NULL,
        tech_stack TEXT NOT NULL,
        features JSONB NOT NULL,
        duration TEXT NOT NULL,
        icon TEXT NOT NULL
      );
    `);

    console.log("Ideas table created successfully!");


    // STEP 2: Insert all six ideas
    for (const idea of ideas) {

      await pool.query(
        `
        INSERT INTO ideas (
          id,
          slug,
          name,
          category,
          difficulty,
          description,
          tech_stack,
          features,
          duration,
          icon
        )

        VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9, $10
        )

        ON CONFLICT (id)
        DO UPDATE SET
          slug = EXCLUDED.slug,
          name = EXCLUDED.name,
          category = EXCLUDED.category,
          difficulty = EXCLUDED.difficulty,
          description = EXCLUDED.description,
          tech_stack = EXCLUDED.tech_stack,
          features = EXCLUDED.features,
          duration = EXCLUDED.duration,
          icon = EXCLUDED.icon
        `,
        [
          idea.id,
          idea.slug,
          idea.name,
          idea.category,
          idea.difficulty,
          idea.description,
          idea.techStack,
          JSON.stringify(idea.features),
          idea.duration,
          idea.icon
        ]
      );

    }

    console.log("All project ideas inserted successfully!");


    // STEP 3: Verify the data
    const result = await pool.query(
      "SELECT id, name, category FROM ideas ORDER BY id"
    );

    console.log("Projects in database:");

    console.table(result.rows);


  } catch (error) {

    console.error("Database seeding failed:", error);

    process.exitCode = 1;

  } finally {

    await pool.end();

  }

}


// Run the seeding function
seedDatabase();