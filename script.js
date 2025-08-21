// Getting elements
const form = document.getElementById('search-form');
const input = document.getElementById('word-input');
const results = document.getElementById('results');

// Favorites array
let favorites = [];

// Event listener for form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const word = input.value.trim();
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

// Display word data
function displayWord(data) {
  // Get phonetic
  let phonetic = "No pronunciation available";
  if (data.phonetics && data.phonetics[1] && data.phonetics[1].text) {
    phonetic = data.phonetics[1].text;
  }

  // Get audio URL
  let audioUrl = null;
  if (data.phonetics && data.phonetics[1] && data.phonetics[1].audio) {
    audioUrl = data.phonetics[1].audio;
  }

  // Build meanings HTML
  let meaningsHTML = "";
  if (data.meanings && data.meanings.length > 0) {
    data.meanings.forEach(meaning => {
      let definitionsHTML = "", partOfSpeech = "", synonyms = "", antonyms = "";

      if (meaning.definitions && meaning.definitions.length > 0) {
        meaning.definitions.forEach(def => {
          definitionsHTML += `<p><strong>Definition:</strong> ${def.definition} `;

          if (def.example) {
            definitionsHTML += `<strong>Example:</strong> ${def.example}</p>`;
          }
        });
      }

      partOfSpeech = `<h3>${meaning.partOfSpeech}</h3>`;

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

// Add word to favorites
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

// Remove word from favorites
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