"use strict";


//to keep track of and to be able to modify current state

const state = {
  city : 'McLean',
  temperature : 65,
  latitude: null,
  longitude: null
  //date

}

// const convertKtoF = (temperature) => {
//   return (temperature - 273.15) * (9 / 5) + 32;
// };

// function to get input city's lat and long for location
const getLocation = () => {
  // location = state.city
  // from axios documentation, the get request has a PATH and then optional params to get city, more info: https://github.com/axios/axios
  axios.get('http://localhost:5000/location', {
      params: {query: state.city}
  }) 
  .then(response => {
  // per axios documentation:`data` is the response that was provided by the server \\data: {}
  //store current lon and lat in state
  state.latitude = response.data[0].lat;
  state.longitude = response.data[0].lon;
  getWeather();
  })
  .catch(error =>{
      console.log("Location error: ", error.response.data)
  });

}

// function to get input city's weather based on its lat and long - called from getLocation
const getWeather = () => {
  // latitude, longitude = current state
  axios.get('http://localhost:5000/weather', {
      params: {lat: state.latitude, lon: state.longitude}
  }) 
  .then(response => {

  const weather = response.data.main.temp

  const convertKtoF = (weather - 273.15) * (9 / 5) + 32
  state.temperature = Math.round(convertKtoF);
  changeTempColorAndLandscape();
  })
  .catch(error =>{
      console.log("Weather error: ", error.response.data)
  });

}

//functions to increase and decrease the temp
const increaseTemperature = ()=>{
  state.temperature +=1;
  changeTempColorAndLandscape()
}

const decreaseTemperature = ()=>{
  state.temperature -=1;
  changeTempColorAndLandscape()
}
//function to change sky
const changeSkyDisplay = () => {
  //getting selected sky image
const input = document.getElementById('sky-select').value;

// selecting the sky_image element object
const currentSky = document.getElementById('sky-image');
let skyDisplay =	'🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';

if (input === 'Sunny'){
  skyDisplay =	'☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
}else if (input === 'Cloudy'){
  skyDisplay =	'☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
}else if (input === 'Rainy'){
  skyDisplay =	'🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
}else if (input === 'Snowy'){
  skyDisplay =	'🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
};
//   skyImage.textContent = skyDisplay;
currentSky.textContent = skyDisplay;
};

//function to change the landscape and temperature value color
const changeTempColorAndLandscape = () => {
    let temperature_value = state.temperature;
    let temperature_color = 'yellow';
    let landscape =	"🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";

    if (temperature_value > 85) {
        landscape = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
        temperature_color = 'red';
        theme.href = 'styles/red.css'
    } else if (temperature_value >= 65) {
        landscape = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
        temperature_color = 'orange';
        theme.href = 'styles/orange.css'
    } else if (temperature_value >= 55) {
        landscape = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
        temperature_color = 'yellow'
        theme.href = 'styles/yellow.css'
    } else if (temperature_value >= 45) {
        landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
        temperature_color = 'green'
        theme.href = 'styles/green.css'
    } else {
        landscape = "🌲🌲⛄️🌲⛄️🌲🌲🌲⛄️🌲";
        temperature_color = 'teal'
        theme.href = 'styles/teal.css'
    }

    // First, get element we want to alter
    // Next, set the textcontent (the string that represents the image) of that element
    const currentLandscape = document.getElementById('landscape-image');
    currentLandscape.textContent = landscape;
    // First, get element we want to alter
    // Change the classname according to the color of the range
    // Next, set the textcontent (the value literal) of that element, to be the value of the integer in current state casted to a string
    const tempValue = document.getElementById('temperature-value');
    tempValue.className = temperature_color;
    tempValue.textContent = String(state.temperature);
}

//function to update City Name
const updateCityName = ()=>{
  const chosenCityName = document.getElementById('city-name-input').value;
  const titleCityName = document.getElementById('city');
  state.city = chosenCityName;
  titleCityName.textContent = state.city;
};

//function to bring back default placeholder
const resetCityName = ()=>{
  const defaultCityName = document.getElementById('city-name-input');
  defaultCityName.value = 'McLean';
  updateCityName();
};

//register event handlers
const registerEventHandlers = () => {
  const increaseTemp = document.getElementById('temp-up-button')
  increaseTemp.addEventListener('click',increaseTemperature)

  const decreaseTemp = document.getElementById('temp-down-button');
  decreaseTemp.addEventListener('click', decreaseTemperature);

  const updateCity = document.getElementById('city-name-input');
  updateCity.addEventListener('input', updateCityName);

  const resetCity = document.getElementById('city-name-reset-button');
  resetCity.addEventListener('click', resetCityName);

  const changeSky = document.getElementById('sky-select');
  changeSky.addEventListener('change', changeSkyDisplay);

  // const changeTempLandscape = document.getElementById('environment_elements');
  // changeTempLandscape.addEventListener('change',changeTempColorAndLandscape)

  const tempAtMoment = document.getElementById('temperature-btn');
  tempAtMoment.addEventListener('click',getLocation);
}
// wait for DOM to load before the events
document.addEventListener('DOMContentLoaded', registerEventHandlers);
