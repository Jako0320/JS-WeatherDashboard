const searchForm = document.getElementById('search-form');

  // Event listener for the search form submission
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city !== '') {
      searchCity(city);
      cityInput.value = '';
    }
  });