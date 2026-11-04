const express = require("express");
const path = require("path");
const pool = require("./config/database");
const ideasRoutes = require("./routes/ideas");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend files
app.use(
  express.static(path.join(__dirname, "../client"))
);

// API routes
app.use("/api/ideas", ideasRoutes);

// HOME PAGE
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/index.html")
  );
});

// INDIVIDUAL IDEA PAGE
app.get("/ideas/:slug", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id FROM ideas WHERE slug = $1",
      [req.params.slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).sendFile(
        path.join(__dirname, "../client/404.html")
      );
    }

    res.sendFile(
      path.join(__dirname, "../client/detail.html")
    );

  } catch (error) {
    console.error("Error loading project:", error);
    res.status(500).send("Unable to load project");
  }
});

// CUSTOM 404 PAGE
app.use((req, res) => {
  res.status(404).sendFile(
    path.join(__dirname, "../client/404.html")
  );
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});