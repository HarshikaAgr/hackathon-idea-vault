const express = require("express");

const router = express.Router();

const pool = require("../config/database");


// GET ALL IDEAS
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM ideas ORDER BY id"
    );

    res.json(result.rows);

  } catch (error) {
    console.error("Error fetching ideas:", error);

    res.status(500).json({
      message: "Unable to retrieve ideas"
    });
  }
});


// GET ONE IDEA BY SLUG
router.get("/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;

    const result = await pool.query(
      "SELECT * FROM ideas WHERE slug = $1",
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Idea not found"
      });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error("Error fetching idea:", error);

    res.status(500).json({
      message: "Unable to retrieve idea"
    });
  }
});

module.exports = router;