const ideasContainer = document.getElementById("ideas-container");


// Get all ideas from the Express backend
async function getIdeas() {
  try {
    const response = await fetch("/api/ideas");

    if (!response.ok) {
      throw new Error("Failed to fetch ideas");
    }

    const ideas = await response.json();

    displayIdeas(ideas);

  } catch (error) {
    console.error("Error:", error);

    ideasContainer.textContent = "Unable to load project ideas.";
  }
}


// Display ideas on the homepage
function displayIdeas(ideas) {

  ideas.forEach((idea) => {

    // Create a card
    const card = document.createElement("article");

    card.classList.add("idea-card");


    // Create icon
    const icon = document.createElement("div");

    icon.classList.add("idea-icon");

    icon.textContent = idea.icon;


    // Create title
    const title = document.createElement("h3");

    title.textContent = idea.name;


    // Create category
    const category = document.createElement("p");

    category.innerHTML = "<strong>Category:</strong> ";

    category.append(document.createTextNode(idea.category));


    // Create difficulty
    const difficulty = document.createElement("p");

    difficulty.innerHTML = "<strong>Difficulty:</strong> ";

    difficulty.append(document.createTextNode(idea.difficulty));


    // Create description
    const description = document.createElement("p");

    description.textContent = idea.description;


    // Create link
    const link = document.createElement("a");

    link.href = `/ideas/${idea.slug}`;

    link.textContent = "Explore Idea →";

    link.setAttribute("role", "button");


    // Add everything to the card
    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(category);
    card.appendChild(difficulty);
    card.appendChild(description);
    card.appendChild(link);


    // Add card to homepage
    ideasContainer.appendChild(card);

  });
}


// Run when the page loads
getIdeas();