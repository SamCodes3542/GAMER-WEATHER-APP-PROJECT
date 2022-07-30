function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
function displayWeatherConditions(response) {
  console.log(response.data);

  celsiusTemperatureFeelsLike = response.data.main.feels_like;
  celsiusTemperature = response.data.main.temp;
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#feels-like").innerHTML = Math.round(
    celsiusTemperatureFeelsLike
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "094b50c9907d04014c22a077f5e1062a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function searchLocation(position) {
  let apiKey = "094b50c9907d04014c22a077f5e1062a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheitFeelsLike(event) {
  event.preventDefault();
  celsiusLinkFeelsLike.classList.remove("now");
  fahrenheitLinkFeelsLike.classList.add("now");
  let feelsLikeElement = document.querySelector("#feels-like");
  let fahrenheitTemperatureFeelsLike =
    (celsiusTemperatureFeelsLike * 9) / 5 + 32;
  feelsLikeElement.innerHTML = Math.round(fahrenheitTemperatureFeelsLike);
}

function convertToCelsiusFeelsLike(event) {
  event.preventDefault();
  celsiusLinkFeelsLike.classList.add("now");
  fahrenheitLinkFeelsLike.classList.remove("now");
  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = Math.round(celsiusTemperatureFeelsLike);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperatureFeelsLike = null;

let celsiusTemperature = null;

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", displayCurrentLocation);

let fahrenheitLinkFeelsLike = document.querySelector(
  "#fahrenheit-link-feels-like"
);
fahrenheitLinkFeelsLike.addEventListener("click", convertToFahrenheitFeelsLike);

let celsiusLinkFeelsLike = document.querySelector("#celsius-link-feels-like");
celsiusLinkFeelsLike.addEventListener("click", convertToCelsiusFeels

Let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

search("New York");
