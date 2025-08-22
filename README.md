# Summative-Lab-Single-Page-Application-SPA-Wordly

## Project Overview
Word Dictionary is a Single Page Application (SPA) built with HTML, CSS and JavaScript. It connects the [Dictionary API](https://dictionaryapi.dev/) to allow users to search for words, view their definitions, pronunciation, synonyms, antonyms, and save favorite terms without reloading the page.

## Features
* It **searches for words** and **fetches** the definitions from the [API](https://dictionaryapi.dev/).

* It plays the **pronunciation audio** (if available).

* Lets users view the **IPA transcription**, **examples**, **synonyms** and **antonyms** of the searched word.

* It lets the users save **favorite words** and remove them when needed.

* Seamless SPA experience without any page reload.

## How to Run Locally:

**1.** Clone this repository:

    * You can fork this repository.

    * Copy the SSH link.

    * Run the following command in your preferred Ubuntu folder: git clone "SSH link".

    * Use cd command to move to the repo folder.
    
    * Open the index.html file by running this command: explorer.exe index.html.

## Instructions
This SPA is very simple to use:

**1.** As you open the page, you need to type the word you'd like to search in the input field that says **Enter a Word**.

**2.** Now you can either click on the **submit button** or press **Enter**.

**3.** The results section of the page will be filled with the searched word information.

**4.** The **h2 heading** will be the searched word.

**5.** You'll see the **IPA (International Phonetic Alphabet) transcription** of the searched word (if available) and an audio button that if clicked will play the word pronunciation (if the audio is available). If either the IPA transcription or the audio is not available, there will be a message informing that.

**6.** There is an **Save to Favorites** button that if clicked lets the user save that word in the **Favorites section**. In the favorite section, every saved word will have a button with the symbol ❌ that if clicked will remove the word from the Favorites List.

**7.** You'll see how the page automatically shows the meanings of the word. Since one word may have **different parts of speech**, this SPA groups the meanings of the same part of speech.

**8.** If a word being used as a certain part of speech only has one meaning, you'll see that the definition will start with **Definition:**, but if it has more than one meaning, each definition will be displayed like this: **definition 1:**, **definition 2:**, etc.

**9.** If there's an **example of usage** of the word with a certain definition, it will be displayed.

**10.** The SPA will also show any **synonyms** and **antonyms** of the word in every part of speech section, if available. If not available, it will show a message informing that.