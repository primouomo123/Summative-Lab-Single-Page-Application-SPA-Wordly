function displayWord(data) {
  // Get phonetic
  let phonetic = "No pronunciation available";
  if (data.phonetics && data.phonetics[0] && data.phonetics[0].text) {
    phonetic = data.phonetics[0].text;
  }

  // Get audio URL
  let audioUrl = null;
  if (data.phonetics && data.phonetics[0] && data.phonetics[0].audio) {
    audioUrl = data.phonetics[0].audio;
  }

  // Build meanings HTML
  let meaningsHTML = "";
  if (data.meanings && data.meanings.length > 0) {
    data.meanings.forEach(meaning => {
      let definitionsHTML = "";

      if (meaning.definitions && meaning.definitions.length > 0) {
        meaning.definitions.forEach(def => {
          definitionsHTML += `<p><strong>Definition:</strong> ${def.definition}</p>`;

          if (def.example) {
            definitionsHTML += `<p><strong>Example:</strong> ${def.example}</p>`;
          }

          if (def.synonyms && def.synonyms.length > 0) {
            definitionsHTML += `<p><strong>Synonyms:</strong> ${def.synonyms.join(", ")}</p>`;
          }

          if (def.antonyms && def.antonyms.length > 0) {
            definitionsHTML += `<p><strong>Antonyms:</strong> ${def.antonyms.join(", ")}</p>`;
          }
        });
      }

      meaningsHTML += `<h3>${meaning.partOfSpeech}</h3>${definitionsHTML}`;
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