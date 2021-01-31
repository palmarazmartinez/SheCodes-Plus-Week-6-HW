//Months, Days, Year
let now = new Date();
let date = now.getDate();
let year = now.getFullYear();

let days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
let day = days[now.getDay()];

let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

let month = months[now.getMonth()];
let h2 = document.querySelector(`.Date`);
h2.innerHTML = `${day}` + `<br>` + `${month} ${date}, ${year}`;


//Time
let hour = now.getHours();
let minute = now.getMinutes();
let realTime = document.querySelector(`.AnswerTime`);

if (minute < 10) {
    realTime.innerHTML = `0${minute}`;
}
if (hour >= 12) {
    realTime.innerHTML = `${hour}: ${minute} PM`;
} else {
    realTime.innerHTML = `${hour}: ${minute} AM`;
}

//Show Location Name 
function showLocation(event) {
    event.preventDefault();
    let locationUserInput = document.querySelector(`.currentLocation`);
    let cityInput = document.querySelector(`#location-input`);
    locationUserInput.innerHTML = cityInput.value;
    locationName(cityInput.value);
}

let inputUserLocation = document.querySelector(`#search-location`);
inputUserLocation.addEventListener(`submit`, showLocation);


//Get API Current Temperature
function locationName(cityName) {
    let apiKey = `51ea909910c3284455f83b220441cc78`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
    let getLocation = `${apiUrl}q=${cityName}&appid=${apiKey}&units=imperial`;
    axios.get(getLocation).then(showLocationTemp);
}


//Show Location Temp.
function showLocationTemp(response) {
    let realTempInfo = response.data.main.temp;
    let showTemp = document.querySelector("#real-temp");
    showTemp.innerHTML = Math.round(realTempInfo);
}


//Fahrenheit Temperature Conversion
function fahConvert(event) {
    event.preventDefault();
    let fahTemp = document.querySelector("#real-temp");
    let currentTemp = fahTemp.innerHTML;
    fahTemp.innerHTML = Math.round((currentTemp * 1.8) + 32);
}

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", fahConvert);


//Celsius Temperature Conversion
function celsiusConvert(event) {
    event.preventDefault();
    let celsiusTemp = document.querySelector("#real-temp");
    let currentTemp = celsiusTemp.innerHTML;
    celsiusTemp.innerHTML = Math.round((currentTemp - 32) / 1.8);
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", celsiusConvert);


//Get "My Location" Button Weather

function myLocationSearch(position) {
    let apiKey = `51ea909910c3284455f83b220441cc78`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(showMyLocationButtonWeather);
}

function showMyLocationButtonWeather(response) {
    document.querySelector(`.currentLocation`).innerHTML = response.data.name;
    document.querySelector("#real-temp").innerHTML = Math.round(
        response.data.main.temp
    );
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(myLocationSearch);
}


let locationButton = document.querySelector("#exact-location-btn");
locationButton.addEventListener("click", getCurrentLocation);