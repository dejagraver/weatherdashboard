var cityForm = document.querySelector("#city-form");
var cityInput = document.querySelector("#city-input"); 
// var displayCity = document.querySelector("#city");
var fiveDay = document.querySelector("#fiveday-header");
var fiveDayConditions = document.querySelector("#fiveday-conditions");

var formSumbitHandler = function(event){
    event.preventDefault();
    var city = cityInput.value.trim();
    if(city){
        fetchWeather(city);
        fetchFiveDay(city);
        cityArray.unshift({city});
        cityInput.value = "";
    } else{
        return "Enter a City";
    }
}
var cityArray = [];


var fetchWeather = function(city){
    var apiKey = `b3c31541a930e81218d1e916ac9ed49a`;
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiURL).then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

var displayWeather = function(data, name){

// weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
// displayCity.appendChild(weatherIcon);


   var temperatureData = document.querySelector(".temp");
   temperatureData.textContent = "Temperature: " + data.main.temp + " °C";

   var displayCity = document.querySelector(".city");
   displayCity.textContent = name;
  
   var humidityData = document.querySelector(".humidity");
   humidityData.textContent = "Humidity: " + data.main.humidity + " %";

   var windData =  document.querySelector(".wind");
   windData.textContent = "Wind Speed: " + data.wind.speed + " km/h";

   var lat = data.coord.lat;
   var lon = data.coord.lon;
   getUvIndex(lat,lon)
}

var getUvIndex = function(lat,lon){
    var apiKey = `b3c31541a930e81218d1e916ac9ed49a`;
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(apiURL).then(function(response){
        response.json().then(function(data){
            displayUvIndex(data)
        });
    });
}
 
var displayUvIndex = function(data){
    const value = data.coord;

    var uvData =  document.querySelector("UV");
    uvData.textContent = "UV Index: " + value ;

    uvIndexValue = document.createElement("span");
    uvIndexValue.textContent = data.coord;

    if(data.value <= 2) {
        uvIndexValue.classList = "green"
    } else if(data.value > 2 && data.value<=8){
        uvIndexValue.classList = "yellow "
    }
    else if(data.value > 8) {
        uvIndexValue.classList = "red"
    };

    uvData.appendChild(uvIndexValue);
}

var fetchFiveDay = function(city){
    var apiKey = `b3c31541a930e81218d1e916ac9ed49a`;
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
    fetch(apiURL).then(function(response) {
        response.json().then(function(data) {
           displayFiveDay(data);
        });
    });
};

var displayFiveDay = function(data) {
    fiveDayConditions.textContent = ""
    fiveDay.textContent = "5-Day Forecast:";

    // var forecast = data.list;
        for(i = 0; i <= 5; i++) {
    //    var fiveDayForcast = forecast[i];

    //    var forecastDate = document.querySelector(".date");
    //    forecastDate.textContent = moment.unix(fiveDayForcast.dt).format("MMM D, YYYY");

    //    var forecastDate = moment.unix(data.current.dt).format("MM/DD/YYYY");
    //    $(`#date`).html(`<h2>${city} (${forecastDate})`);

       var fiveDayTemp = document.querySelector(".fortemp");
       fiveDayTemp.textContent = data.daily[i].temp.day; + " °C";
       
       var fiveDayHumidity = document.querySelector(".forhumidity");
       fiveDayHumidity.textContent = data.daily[i].humidity + "  %";

       var fiveDayWind = document.querySelector(".forwind");
       fiveDayWind.textContent = data.daily[i].wind_speed + " km/h";
    }
}
cityForm.addEventListener("submit", formSumbitHandler);