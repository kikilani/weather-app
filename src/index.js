let now = new Date();
let currentTime = document.querySelector(".current-time");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "March",
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
if (minutes < 10){
  minutes =`0${minutes}`
}
let month = months[now.getMonth()];
currentTime.innerHTML = `It is ${hours}:${minutes} on ${day}, ${month} ${date}`;

function getTemperature(response){
let cityElement = document.querySelector(".current-city");
cityElement.innerHTML = response.data.name;
let currentTemperature = document.querySelector(".current-temp");
fahrenheitTemperature = response.data.main.temp;
currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
let weather = response.data.weather[0].description;
let weatherDescription = document.querySelector(".weather-description");
weatherDescription.innerHTML =`${weather}`;
let windSpeed= document.querySelector(".wind-speed");
windSpeed.innerHTML = Math.round(response.data.wind.speed);
let weatherIcon = document.querySelector(".large-icon");
weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  console.log(response);
}



function search(city) {
 let unit =`imperial`;
let apiKey=`d8cb484f7bb8a25ccc8f43355441ee5f`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
 axios.get(apiUrl).then(getTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector(".search");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector(".current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}


function displayCelsiusTemperature(event){
  event.preventDefault();
  let temperatureConversion = document.querySelector(".current-temp");

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemperature =(fahrenheitTemperature -32)* 5/9;
  temperatureConversion.innerHTML = Math.round(celsiusTemperature)
  
}

let fahrenheitTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let submitSearch = document.querySelector(".city");
submitSearch.addEventListener("submit", handleSubmit);

search("New York");