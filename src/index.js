function handleSearch(event) {
  event.preventDefault();
  let userInput = document.querySelector("#search-field");
  let apiKey = "e2c0b68bt1bfbc04o7da0f6ea7720334";
  let city = userInput.value;
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(url).then(showData);
}

function showData(response) {
  let temperature = document.querySelector("#temperature-value");
  let current_temperature = Math.round(response.data.temperature.current);
  temperature.innerHTML = current_temperature;

  let city = document.querySelector("#current-city");
  city.innerHTML = `${response.data.city}`;

  console.log(response);

  let condition = document.querySelector("#condition");
  condition.innerHTML = `${response.data.condition.description}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed}km/h`;
}

function formatDate(data) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = data.getDay();
  let minutes = data.getMinutes();
  let hours = data.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${weekDays[day]} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

let currentDay = new Date();
let data = document.querySelector("#current-data");
data.innerHTML = formatDate(currentDay);
