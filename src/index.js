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
let temperature = Math.round(response.data.main.temp);
let currentTemperature = document.querySelector(".current-temp");
currentTemperature.innerHTML = `${temperature}`
let weather = response.data.weather[0].description;
let weatherDescription = document.querySelector(".weather-description");
weatherDescription.innerHTML =`${weather}`;
let weatherIcon = document.querySelector(".large-icon");
weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

let submitSearch = document.querySelector(".city");
submitSearch.addEventListener("submit", handleSubmit);

search("New York");