// Your code here
document.addEventListener("DOMContentLoaded", () => {
  fetchCharacters();
});

const characterBar = document.getElementById("character-bar");
const detailedInfo = document.getElementById("detailed-info");
const characterImage = document.getElementById("character-image");
const characterName = document.getElementById("character-name");
const voteCount = document.getElementById("vote-count");
const votesForm = document.getElementById("votes-form");
const resetButton = document.getElementById("reset-btn");
const newCharacterForm = document.getElementById("character-form");

let selectedCharacter = null; // Stores currently selected character

// Fetch and Display Characters
function fetchCharacters() {
  fetch("http://localhost:3000/characters")
    .then((response) => response.json())
    .then(data => {
      const characterBar = document.getElementById("character-bar");
      characterBar.innerHTML = "";

      data.forEach(character => {
        const span = document.createElement("span");
        span.textContent = character.name;
        span.classList.add("character");
        span.dataset.id = character.id;

        span.addEventListener("click", () => {
            console.log(`Clicked on: ${character.name}`);
            showCharacterDetails(character)
        });

        characterBar.appendChild(span);
      });
    })
    .catch((error) => console.error("Error fetching characters:", error));
}

// Show Character Details on Click
function showCharacterDetails(character) {
    if(!character) return;

    console.log(`Displaying details for: ${character.name}`)

  selectedCharacter = character;
  document.getElementById("image").src = character.image;
  document.getElementById("image").alt = character.name;
  document.getElementById("name").textContent = character.name;
  document.getElementById("vote-count").textContent = character.votes;

}

// Handle Voting Mechanism
votesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!selectedCharacter) return;

  const votesToAdd = parseInt(event.target.votes.value);
  selectedCharacter.votes += votesToAdd;
  voteCount.textContent = selectedCharacter.votes;

  // Persist the votes using PATCH
  updateVotesOnServer(selectedCharacter.id, selectedCharacter.votes);

  event.target.reset();
});

// Update Votes on Server
function updateVotesOnServer(id, votes) {
  fetch(`http://localhost:3000/characters/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ votes }),
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error updating votes:", error));
}

// Reset Votes
resetButton.addEventListener("click", () => {
  if (!selectedCharacter) return;

  selectedCharacter.votes = 0;
  voteCount.textContent = 0;

  updateVotesOnServer(selectedCharacter.id, 0);
});

// Add New Character
newCharacterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newCharacter = {
    name: event.target.name.value,
    image: event.target.image.value,
    votes: 0,
  };

  // Save new character to server
  fetch("http://localhost:3000/characters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCharacter),
  })
    .then((response) => response.json())
    .then((savedCharacter) => {
      addCharacterToBar(savedCharacter);
      showCharacterDetails(savedCharacter);
    })
    .catch((error) => console.error("Error adding character:", error));

  event.target.reset();
});

// Add New Character to Bar
function addCharacterToBar(character) {
  const span = document.createElement("span");
  span.textContent = character.name;
  span.classList.add("character");
  span.dataset.id = character.id;

  span.addEventListener("click", () => showCharacterDetails(character));

  characterBar.appendChild(span);
  const name ="Stella" ;const name2 ="Stella"; const name3= "Stella";

}


