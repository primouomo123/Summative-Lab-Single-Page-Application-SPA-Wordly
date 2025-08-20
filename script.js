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

  // Getting meanings, part of speech, synonyms, antonyms, examples
  let meaningsArray = [];
  if (data.meanings && data.meanings.length > 0) {
    let partOfSpeach, sectionSynonyms, sectionAntonyms, example;
    data.meanings.forEach(meaning => {
      partOfSpeach = meaning.partOfSpeach;

      if (meaning.synonyms && meaning.synonyms.length > 0) {
        sectionSynonyms = meaning.synonyms;
      }

      if (meaning.antonyms && meaning.antonyms.length > 0) {
        sectionAntonyms = meaning.antonyms;
      }
    });
  }

  // Update the DOM
  

  // Add "Save to Favorites" button
  

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