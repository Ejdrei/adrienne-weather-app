//show primary weather
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#primary-temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;

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

  getForecast(response.data.coord);
}


let apiKey = "d62ca600ff575150d729106a04fd5155";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=d62ca600ff575150d729106a04fd5155&units=metric`;
axios.get(apiUrl).then(displayWeatherCondition);

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

//search city
function search(event) {
  event.preventDefault();
  let apiKey = "d62ca600ff575150d729106a04fd5155";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d62ca600ff575150d729106a04fd5155&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//default city search
function displayTemperature(response) {
let descriptionElement = document.querySelector("#description"); 
let temperatureElement= document.query("#primary-temperature");
let cityElement = document.querySelector("#city");
temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
}


let celciusTemperature = null;

//search location
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

//format days for forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//weather forecast

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index) {
    if (index < 6) {
    forecastHTML =
      forecastHTML +
      ` <div class="col-2">
                        <div class="weather-forecast-date">
                            ${formatDay(forecastDay.dt)}
                        </div>
                        <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt"" width="90" />
                        <div class="weather-forecast-temperatures">
                            <span class="weather-forecast-temperature-max">
                                ${Math.round(forecastDay.temp.max)}° 
                            </span>
                            <span class="weather-forecast-temperature-min">
                               ${Math.round(forecastDay.temp.min)}° 
                            </span>
                        </div>
          </div>`;
  }
  });

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}
//getting weather forecast
function getForecast(coordinates) {
  let apiKey = "d62ca600ff575150d729106a04fd5155";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=d62ca600ff575150d729106a04fd5155&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

displayForecast();
