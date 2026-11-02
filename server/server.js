const express = require("express");
const path = require("path");
const ideas = require("./data/ideas");

const app = express();

const PORT = 3000;

// Serve static files such as HTML, CSS, and JavaScript
app.use(express.static(path.join(__dirname, "public")));


// HOME PAGE ROUTE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


// GET ALL IDEAS
app.get("/api/ideas", (req, res) => {
  res.json(ideas);
});


// GET ONE IDEA
app.get("/api/ideas/:slug", (req, res) => {
  const idea = ideas.find((item) => item.slug === req.params.slug);

  if (!idea) {
    return res.status(404).json({ message: "Idea not found" });
  }

  res.json(idea);
});


// INDIVIDUAL IDEA PAGE
app.get("/ideas/:slug", (req, res) => {
  const idea = ideas.find((item) => item.slug === req.params.slug);

  if (!idea) {
    return res.status(404).sendFile(
      path.join(__dirname, "public", "404.html")
    );
  }

  res.sendFile(path.join(__dirname, "public", "detail.html"));
});


// 404 PAGE
app.use((req, res) => {
  res.status(404).sendFile(
    path.join(__dirname, "public", "404.html")
  );
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});