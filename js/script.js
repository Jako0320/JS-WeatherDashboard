const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const apiKey = '57d4ee159d4b8fa8ae8bb055910cc28c';


  // Event listener for the search form submission
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city !== '') {
      searchCity(city);
      cityInput.value = '';
    }
  });

  // Retrieve weather data for a city
async function getWeatherData(city) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      if (!response.ok) {
        throw new Error('Unable to fetch weather data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching weather data');
    }
  }
  
  // Retrieve forecast data for a city
  async function getForecastData(city) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
      if (!response.ok) {
        throw new Error('Unable to fetch forecast data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching forecast data');
    }
  }