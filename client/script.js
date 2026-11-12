const ideasContainer = document.getElementById("ideas-container");

const searchInput = document.getElementById("search-input");

let allIdeas = [];

// Fetch ideas from PostgreSQL through Express
async function getIdeas() {
  try {
    const response = await fetch("/api/ideas");

    if (!response.ok) {
      throw new Error("Failed to fetch ideas");
    }

    const ideas = await response.json();

    allIdeas = ideas;

    displayIdeas(allIdeas);
  } catch (error) {
    console.error("Error:", error);

    ideasContainer.textContent = "Unable to load project ideas.";
  }
}

// Display project cards
function displayIdeas(ideas) {
  // Clear existing cards
  ideasContainer.innerHTML = "";

  // Show message if no results
  if (ideas.length === 0) {
    const message = document.createElement("p");

    message.textContent = "No matching projects found.";

    ideasContainer.appendChild(message);

    return;
  }

  // Create each project card
  ideas.forEach((idea) => {
    const card = document.createElement("article");

    card.classList.add("idea-card");

    // Icon
    const icon = document.createElement("div");

    icon.classList.add("idea-icon");

    icon.textContent = idea.icon;

    // Title
    const title = document.createElement("h3");

    title.textContent = idea.name;

    // Category
    const category = document.createElement("p");

    category.innerHTML = "<strong>Category:</strong> ";

    category.append(document.createTextNode(idea.category));

    // Difficulty
    const difficulty = document.createElement("p");

    difficulty.innerHTML = "<strong>Difficulty:</strong> ";

    difficulty.append(document.createTextNode(idea.difficulty));

    // Description
    const description = document.createElement("p");

    description.textContent = idea.description;

    // Detail page link
    const link = document.createElement("a");

    link.href = `/ideas/${idea.slug}`;

    link.textContent = "Explore Idea →";

    link.setAttribute("role", "button");

    // Add elements to card
    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(category);
    card.appendChild(difficulty);
    card.appendChild(description);
    card.appendChild(link);

    // Add card to page
    ideasContainer.appendChild(card);
  });
}

// Search function
function searchIdeas() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  const filteredIdeas = allIdeas.filter((idea) => {
    const nameMatch = idea.name.toLowerCase().includes(searchTerm);

    const categoryMatch = idea.category.toLowerCase().includes(searchTerm);

    const difficultyMatch = idea.difficulty.toLowerCase().includes(searchTerm);

    return nameMatch || categoryMatch || difficultyMatch;
  });

  displayIdeas(filteredIdeas);
}

// Listen for search input
searchInput.addEventListener("input", searchIdeas);

// Load project ideas
getIdeas();