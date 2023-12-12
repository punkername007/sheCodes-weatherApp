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

  getForecast(response.data.city);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "e2c0b68bt1bfbc04o7da0f6ea7720334";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `<div class="weather-forecast-day">
                        <div class="weather-forecast-date">${formatDay(
                          day.time
                        )}</div>
                        <img src="${
                          day.condition.icon_url
                        }" class="weather-forecast-icon">
                        <div class="weather-forecast-temperatures">
                            <div class="forecast-temperature"> <strong>${Math.round(
                              day.temperature.maximum
                            )}°</strong></div>
                            <div class="forecast-temperature"> ${Math.round(
                              day.temperature.minimum
                            )}° </div>
                        </div>
                    </div>`;
    }
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("kingston");
displayForecast();
