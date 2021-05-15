function searchCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
}

let now = new Date();

let h2 = document.querySelector("h2");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();
let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", search);

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

let month = months[now.getMonth()];

h2.innerHTML = `${day}, ${date} ${month}, ${year} ${hours}:${minutes}`;

//show primary weather
function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#primary-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity-percentage").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );

  //weather description
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  //weather icon
   let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  celciusTemperature = response.data.main.temp;
}

//search city
function search(event) {
  event.preventDefault();
  let apiKey = "d62ca600ff575150d729106a04fd5155";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d62ca600ff575150d729106a04fd5155&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//convert to fahrenheit
function convertToFahrenheit(event) {
  event.preventDefault();
  let primaryTemperatureElement = document.querySelector(
    "#primary-temperature"
  );
  let temperature = primaryTemperatureElement.innerHTML;
  primaryTemperatureElement.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

//convert to celcius
function convertToCelcius(event) {
  event.preventDefault();
  let primaryTemperatureElement = document.querySelector(
    "#primary-temperature");
  let temperature = primaryTemperatureElement.innerHTML;
  primaryTemperatureElement.innerHTML = Math.round(celciusTemperature); 
}
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

let celciusTemperature = null;

//current location
function searchLocation(position) {
  let apiKey = "d62ca600ff575150d729106a04fd5155";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=d62ca600ff575150d729106a04fd5155&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//current location
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);