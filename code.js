const searchForm = document.getElementById("search");
const searchInput = document.getElementById("searchInput");
const result = document.getElementById("result");

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

searchForm.addEventListener("submit", searchWord);

async function searchWord(event) {
  event.preventDefault();
  const word = searchInput.value.trim();

  if (word === "") {
    result.innerHTML = "<p>Please enter a word.</p>";
    return;
  }
  result.innerHTML = "<p>Searching...</p>";

  try {
    const response = await fetch(`${API_URL}${word}`);

    if (!response.ok) {
      throw new Error("Word not found");
    }
    const data = await response.json();

    displayWord(data[0]);
  } catch (error) {
    result.innerHTML = `
      <h3>Error</h3>
      <p>${error.message}</p>
      <p>Please try another word.</p>
    `;
  }
}

function displayWord(wordData) {
  const word = wordData.word;
  const phonetic = wordData.phonetic || "Not available";
