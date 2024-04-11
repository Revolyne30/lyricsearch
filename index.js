// JavaScript (index.js)
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');
const apiListURL = 'https://api.apis.guru/v2/list.json';

// Fetch the list of APIs
fetch(apiListURL)
  .then(response => response.json())
  .then(data => {
    // Find the API that provides lyrics search functionality
    const lyricsAPI = data.apis.find(api => api.name === 'Lyrics API');
    if (!lyricsAPI) {
      throw new Error('Lyrics API not found in the list of APIs');
    }

    // Use the lyrics API endpoint to fetch lyrics based on user input
    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const query = searchInput.value;
      if (query.trim() === '') return;

      try {
        const response = await fetch(lyricsAPI.url + `?q=${query}`);
        const data = await response.json();
        displayResults(data);
      } catch (error) {
        console.error('Error fetching lyrics:', error);
      }
    });
  })
  .catch(error => {
    console.error('Error fetching API list:', error);
  });

// Function to display search results
function displayResults(data) {
  resultsDiv.innerHTML = '';
  data.forEach(result => {
    const div = document.createElement('div');
    div.innerHTML = `<h3>${result.title}</h3><p>${result.lyrics}</p>`;
    resultsDiv.appendChild(div);
  });
}
