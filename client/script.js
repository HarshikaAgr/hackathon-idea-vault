const ideasContainer = document.getElementById("ideas-container");

const searchInput = document.getElementById("search-input");

const ideaCount = document.getElementById("idea-count");

let allIdeas = [];

// Fetch project ideas from the backend
async function getIdeas() {
  ideasContainer.innerHTML = "";

  const loadingMessage = document.createElement("p");

  loadingMessage.className = "status-message";

  loadingMessage.textContent = "Loading project ideas...";

  ideasContainer.appendChild(loadingMessage);

  try {
    const response = await fetch("/api/ideas", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const ideas = await response.json();

    if (!Array.isArray(ideas)) {
      throw new Error("Invalid project data received");
    }

    allIdeas = ideas;

    searchIdeas();
  } catch (error) {
    console.error("Failed to load ideas:", error);

    ideasContainer.innerHTML = "";

    ideaCount.textContent = "";

    const errorMessage = document.createElement("div");

    errorMessage.className = "status-message";

    const message = document.createElement("p");

    message.textContent = "Project ideas couldn't be loaded. Please try again.";

    const retryButton = document.createElement("button");

    retryButton.className = "retry-button";

    retryButton.textContent = "Try again";

    retryButton.addEventListener("click", getIdeas);

    errorMessage.appendChild(message);

    errorMessage.appendChild(retryButton);

    ideasContainer.appendChild(errorMessage);
  }
}

// Display project cards
function displayIdeas(ideas) {
  ideasContainer.innerHTML = "";

  ideaCount.textContent = `${ideas.length} ${ideas.length === 1 ? "idea" : "ideas"}`;

  if (ideas.length === 0) {
    const message = document.createElement("p");

    message.className = "status-message";

    message.textContent = "No matching projects found.";

    ideasContainer.appendChild(message);

    return;
  }

  ideas.forEach((idea) => {
    const card = document.createElement("article");

    card.className = "idea-card";

    // Icon
    const icon = document.createElement("div");

    icon.className = "idea-icon";

    icon.textContent = idea.icon;

    // Project name
    const title = document.createElement("h3");

    title.textContent = idea.name;

    // Category
    const category = document.createElement("p");

    const categoryLabel = document.createElement("strong");

    categoryLabel.textContent = "Category: ";

    category.appendChild(categoryLabel);

    category.append(document.createTextNode(idea.category));

    // Difficulty
    const difficulty = document.createElement("p");

    const difficultyLabel = document.createElement("strong");

    difficultyLabel.textContent = "Difficulty: ";

    difficulty.appendChild(difficultyLabel);

    difficulty.append(document.createTextNode(idea.difficulty));

    // Description
    const description = document.createElement("p");

    description.textContent = idea.description;

    // Detail link
    const link = document.createElement("a");

    link.href = `/ideas/${encodeURIComponent(idea.slug)}`;

    link.textContent = "View project →";

    link.setAttribute("role", "button");

    // Build card
    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(category);
    card.appendChild(difficulty);
    card.appendChild(description);
    card.appendChild(link);

    ideasContainer.appendChild(card);
  });
}

// Search projects
function searchIdeas() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  const filteredIdeas = allIdeas.filter((idea) => {
    return (
      idea.name.toLowerCase().includes(searchTerm) ||
      idea.category.toLowerCase().includes(searchTerm) ||
      idea.difficulty.toLowerCase().includes(searchTerm)
    );
  });

  displayIdeas(filteredIdeas);
}

// Listen for search input
searchInput.addEventListener("input", searchIdeas);

// Load ideas when page opens
getIdeas();
