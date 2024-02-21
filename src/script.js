function weatherUpdate(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionWeatherDetail = document.querySelector(
    ".current-weather-details"
  );
  let humidityElement = document.querySelector(".humidity-data");
  let windElement = document.querySelector(".wind-data");
  // additional date element required for parsing
  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector(".time");
  let dayElement = document.querySelector(".week-day");
  let icon = document.querySelector("#current-weather-icon");

  // TO BE ADDED: variables for day, month, year

  cityElement.innerHTML = response.data.city;
  // calls formatted day through function
  dayElement.innerHTML = formatDay(date);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionWeatherDetail.innerHTML = response.data.condition.description;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  // calls formatted time through function
  timeElement.innerHTML = formatDate(date);
  temperatureElement.innerHTML = Math.round(temperature);
  // inject icon url based on condition data
  icon.innerHTML = `<img src ="${response.data.condition.icon_url}" class="current-weather-icon" />`;

  console.log(response.data);
}

// format time element
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

// format day element
function formatDay(date) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dayElement = weekDays[date.getDay()];
  return `${dayElement}`;
}

function searchCity(city) {
  // make api call and update the interface
  let apiKey = "c4a3tdof06a6b4e736e7b19f64045e07";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherUpdate);
}

function SearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", SearchSubmit);

// pull weather data upon page reload
searchCity("Dresden");
