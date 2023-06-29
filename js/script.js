const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const apiKey = "57d4ee159d4b8fa8ae8bb055910cc28c";
const currentWeatherSection = document.getElementById("current-weather");
const forecastSection = document.getElementById("forecast");
const searchHistorySection = document.getElementById("search-history");
let searchHistory = [];

// Event listener for the search form submission
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city !== "") {
    searchCity(city);
    cityInput.value = "";
  }
});

// Retrieve weather data for a city
async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Unable to fetch weather data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    alert("An error occurred while fetching weather data");
  }
}

// Retrieve forecast data for a city
async function getForecastData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Unable to fetch forecast data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    alert("An error occurred while fetching forecast data");
  }
}

// Display current weather
function displayCurrentWeather(data) {
  currentWeatherSection.innerHTML = `
      <h2>${data.name} (${new Date().toLocaleDateString()})</h2>
      <div>
        <img src="http://openweathermap.org/img/w/${
          data.weather[0].icon
        }.png" alt="${data.weather[0].description}">
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity} %</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
      </div>
    `;
}

// Display forecast
function displayForecast(data) {
  forecastSection.innerHTML = "";
  for (let i = 0; i < data.list.length; i += 8) {
    const forecast = data.list[i];
    const forecastDate = new Date(forecast.dt_txt).toLocaleDateString();
    const forecastIcon = forecast.weather[0].icon;
    const forecastTemp = forecast.main.temp;
    const forecastWindSpeed = forecast.wind.speed;
    const forecastHumidity = forecast.main.humidity;

    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");
    forecastCard.innerHTML = `
        <h3>${forecastDate}</h3>
        <img src="http://openweathermap.org/img/w/${forecastIcon}.png" alt="${forecast.weather[0].description}">
        <p>Temperature: ${forecastTemp} °C</p>
        <p>Humidity: ${forecastHumidity} %</p>
        <p>Wind Speed: ${forecastWindSpeed} m/s</p>
      `;
    forecastSection.appendChild(forecastCard);
  }
}

// Search for city weather
async function searchCity(city) {
  const weatherData = await getWeatherData(city);
  const forecastData = await getForecastData(city);

  displayCurrentWeather(weatherData);
  displayForecast(forecastData);
  if (!searchHistory.includes(city)) {
    searchHistory.push(city);
    displaySearchHistory();
  }
}

// Display search history
function displaySearchHistory() {
  searchHistorySection.innerHTML = "";
  searchHistory.forEach((city) => {
    const cityCard = document.createElement("div");
    cityCard.classList.add("city-card");
    cityCard.textContent = city;
    cityCard.addEventListener("click", () => {
      searchCity(city);
    });
    searchHistorySection.appendChild(cityCard);
  });
}

// Load search history from local storage
function loadSearchHistory() {
  const storedHistory = localStorage.getItem("searchHistory");
  if (storedHistory) {
    searchHistory = JSON.parse(storedHistory);
    displaySearchHistory();
  }
}

// Save search history to local storage
function saveSearchHistory() {
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

// Load search history when the page loads
window.addEventListener("load", () => {
  loadSearchHistory();
});
