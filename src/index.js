function searchCity(city) {
  let apiKey = "e2c0b68bt1bfbc04o7da0f6ea7720334";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(url).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-field");
  searchCity(searchInput.value);
}

function refreshWeather(response) {
  let city = document.querySelector("#current-city");
  let condition = document.querySelector("#condition");
  let current_temperature = response.data.temperature.current;
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#temperature-icon");
  let humidity = document.querySelector("#humidity");
  let temperature = document.querySelector("#temperature-value");
  let time = document.querySelector("#current-time");
  let wind = document.querySelector("#wind-speed");

  condition.innerHTML = `${response.data.condition.description}`;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  temperature.innerHTML = Math.round(current_temperature);
  city.innerHTML = `${response.data.city}`;
  icon.innerHTML = `<img src=${response.data.condition.icon_url} class = "temperature-icon">`;
  time.innerHTML = formatDate(date);
}

function formatDate(date) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = weekDays[date.getDay()];
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml += `<div class="weather-forecast-day">
                        <div class="weather-forecast-date">${day}</div>
                        <div class="weather-forecast-icon">🌤</div>
                        <div class="weather-forecast-temperatures">
                            <div class="forecast-temperature"> <strong> 18° </strong></div>
                            <div class="forecast-temperature"> 12° </div>
                        </div>
                    </div>`;
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("kingston");
displayForecast();
