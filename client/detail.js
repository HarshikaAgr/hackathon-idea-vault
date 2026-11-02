const detailsContainer = document.getElementById("idea-details");


// Get the project slug from the URL
const slug = window.location.pathname.split("/").pop();


// Fetch project information
async function getIdeaDetails() {

  try {

    const response = await fetch(`/api/ideas/${slug}`);

    if (!response.ok) {
      throw new Error("Project not found");
    }

    const idea = await response.json();

    displayIdeaDetails(idea);

  } catch (error) {

    console.error("Error:", error);

    detailsContainer.textContent = "Unable to load project details.";
  }
}


// Display selected project
function displayIdeaDetails(idea) {

  // Project icon
  const icon = document.createElement("div");

  icon.classList.add("detail-icon");

  icon.textContent = idea.icon;


  // Project name
  const title = document.createElement("h1");

  title.textContent = idea.name;


  // Description
  const description = document.createElement("p");

  description.textContent = idea.description;


  // Section heading
  const heading = document.createElement("h2");

  heading.textContent = "Project Information";


  // Project attributes
  const info = document.createElement("div");

  info.classList.add("project-info");


  function addInfo(label, value) {

    const paragraph = document.createElement("p");

    const strong = document.createElement("strong");

    strong.textContent = label + ": ";

    paragraph.appendChild(strong);

    paragraph.append(document.createTextNode(value));

    info.appendChild(paragraph);
  }


  addInfo("ID", idea.id);
  addInfo("Slug", idea.slug);
  addInfo("Category", idea.category);
  addInfo("Difficulty", idea.difficulty);
  addInfo("Tech Stack", idea.techStack);
  addInfo("Estimated Duration", idea.duration);


  // Features heading
  const featuresHeading = document.createElement("h2");

  featuresHeading.textContent = "Key Features";


  // Features list
  const featuresList = document.createElement("ul");

  idea.features.forEach((feature) => {

    const listItem = document.createElement("li");

    listItem.textContent = feature;

    featuresList.appendChild(listItem);

  });


  // Add elements to page
  detailsContainer.appendChild(icon);
  detailsContainer.appendChild(title);
  detailsContainer.appendChild(description);
  detailsContainer.appendChild(heading);
  detailsContainer.appendChild(info);
  detailsContainer.appendChild(featuresHeading);
  detailsContainer.appendChild(featuresList);

}


// Load selected project
getIdeaDetails();