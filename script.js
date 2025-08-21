// Getting elements
const form = document.getElementById('search-form');
const input = document.getElementById('word-input');
const results = document.getElementById('results');

// Favorites array
let favorites = [];

// Event listener for the form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const word = input.value.trim();
  input.value = "";
  if (word) {
    fetchWord(word);
  }
});

// Fetch word from the API
async function fetchWord(word) {
  results.innerHTML = "<p>Loading...</p>";
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) throw new Error('Word not found');
    const data = await response.json();
    displayWord(data[0]);
  } catch (error) {
    handleError(error);
  }
}

// Function to display the searched word content
function displayWord(data) {
  // Getting phonetic
  let phonetic = "No pronunciation available";
if (data.phonetics && data.phonetics.length > 0) {
  const phoneticObj = data.phonetics.find(phonet => phonet.text);
  if (phoneticObj) phonetic = phoneticObj.text;
}

  // Getting audio URL
  let audioUrl = null;
if (data.phonetics && data.phonetics.length > 0) {
  const audioObj = data.phonetics.find(phonet => phonet.audio);
  if (audioObj) audioUrl = audioObj.audio;
}

  // Building meanings HTML
  let meaningsHTML = "";
  if (data.meanings && data.meanings.length > 0) { // Validating the meanings array

    // Looping through all meanings elements
    data.meanings.forEach(meaning => {
      let definitionsHTML = "", partOfSpeech = "";
      let synonyms = "No synonyms available", antonyms = "No antonyms available";

      if (meaning.definitions && meaning.definitions.length > 0) { /* Validating the definitions
        array */

        // Looping through all the definitions elements
        meaning.definitions.forEach((def, index) => {
          if (meaning.definitions.length === 1) {
            definitionsHTML += `<p><strong>Definition:</strong> ${def.definition}</p>`;
          } else if (meaning.definitions.length > 1) {
            definitionsHTML += `<p><strong>Definition ${index + 1}:</strong> ${def.definition}</p>`;
          }          

          if (def.example) {
            definitionsHTML += `<p><strong>Example:</strong> ${def.example}</p> <br>`;
          } else {
            definitionsHTML += "<br>"
          }
        });
      }

      partOfSpeech = `<h3> As ${meaning.partOfSpeech}:</h3>`;

      if (meaning.synonyms && meaning.synonyms.length > 0) {
        synonyms = `<p><strong>Synonyms:</strong>${meaning.synonyms.join(", ")}</p>`;
      }

      if (meaning.antonyms && meaning.antonyms.length > 0) {
        antonyms = `<p><strong>Antonyms:</strong>${meaning.antonyms.join(", ")}</p>`;
      }

      meaningsHTML += `${partOfSpeech} ${definitionsHTML} ${synonyms} ${antonyms} <br>`;
    });
  }

  // Update the DOM
  let html = `<h2>${data.word}</h2>`;
  html += `<p><strong>Pronunciation:</strong> ${phonetic}`;
  if (audioUrl) {
    html += ` <button onclick="playAudio('${audioUrl}')">🔊</button>`;
  }
  html += `</p>`;

  // Add "Save to Favorites" button
  html += `<button id="save-favorite">Save to Favorites</button>`;

  html += meaningsHTML;

  results.innerHTML = html;

  // Add event listener for the Save button
  const saveBtn = document.getElementById('save-favorite');
  saveBtn.addEventListener('click', () => addFavorite(data.word));
}

// Add word to favorites section
function addFavorite(word) {
  if (!favorites.includes(word)) {
    favorites.push(word);
    renderFavorites();
  }
}

// Render favorites list
function renderFavorites() {
  const list = document.getElementById('favorites-list');
  list.innerHTML = ""; // Clear the current list

  favorites.forEach(word => {
    const li = document.createElement('li');
    li.textContent = word;

    // Add a "Remove" button for each favorite
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "❌";
    removeBtn.addEventListener('click', () => removeFavorite(word));

    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}

// Remove word from favorites list
function removeFavorite(word) {
  favorites = favorites.filter(fav => fav !== word);
  renderFavorites();
}

// Play audio function
function playAudio(url) {
  const audio = new Audio(url);
  audio.play();
}

// Handle errors
function handleError(error) {
  results.innerHTML = `<p style="color:red;">${error.message}</p>`;
}