function search(event) {
  event.preventDefault();
  let userInput = document.querySelector("#search-field");
  let city = document.querySelector("#current-city");
  city.innerHTML = `${userInput.value}`;
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
searchForm.addEventListener("submit", search);

let currentDay = new Date();
let data = document.querySelector("#current-data");
data.innerHTML = formatDate(currentDay);
