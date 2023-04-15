"use strict";


//to keep track of and to be able to modify current state

const state = {
  city : 'McLean',
  temperature : 65,
  latitude: null,
  longitude: null


}
// would love to not need this and change the units in params instead
const convertKtoF = (temperature) => {
  return (temperature - 273.15) * (9 / 5) + 32;
};

// function to get input city's lat and long for location
const getLocation = () => {
  // location = state.city
  // from axios documentation, the get request has a PATH and then optional params to get city, more info: https://github.com/axios/axios
  axios.get('http://localhost:5000/location', {
      params: {q: state.city}
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
`1`
}

// function to get input city's weather based on its lat and long - called from getLocation
const getWeather = () => {
  // latitude, longitude = current state
  axios.get('http://localhost:5000/weather', {
      params: {lat: state.latitude, lon: state.longitude}
  }) 
  .then(response => {
  // check out how a response looks: https://openweathermap.org/current#geo or the replit I shared
  const weather = response.data.main.temp
  // couldn't get adding a unit (fahrenheit) param to work for temperature, there is an option in the docs
  state.temp = Math.round(convertKtoF(weather));
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
const changeSkyDisplay = ()=>{
  const skyInput = document.getElementById('sky-select').value;

  const currentSkyDisplay = document.getElementById('sky_image');
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
  currentSkyDisplay.textContent = skyDisplay;
};

// selecting the sky_image element object



//function to change the landscape and temperature value color
const changeTempColorAndLandscape = () => {
    let temperature_value = state.temp;
    let temperature_color = 'yellow';
    let landscape =	"🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";

    if (temperature_value > 80) {
        landscape = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
        temperature_color = 'red'
    } else if (temperature_value >= 70) {
        landscape = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
        temperature_color = 'orange'
    } else if (temperature_value >= 60) {
        landscape = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
        temperature_color = 'yellow'
    } else if (temperature_value >= 50) {
        landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
        temperature_color = 'green'
    } else {
        landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
        temperature_color = 'teal'
    }

}
//function to update City Name
const updateCityName = ()=>{

  
};

//function to bring back default placeholder
const resetCityName = ()=>{
  
};

//register event handlers
const registerEventHandlers = () => {

}