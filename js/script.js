var cityForm = document.querySelector("#city-form");
var cityInput = document.querySelector("#city-input"); 

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
    searchHistory()
}
var cityArray = [];

var searchHistory = function(){
    localStorage.setItem("city", JSON.stringify(city));
};

var displayHistory = function(){
    var history = JSON.parse(window.localStorage.getItem("city"))
    onclick("input").then(city);
}

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

    var uvData =  document.querySelector(".UV");
    uvData.textContent = "UV Index: " + data.value;

    uvIndexValue = document.createElement("span");
    uvIndexValue.textContent = data.value;

    if(data.value <= 2) {
        uvIndexValue.classList = "green"
    } else if(data.value > 2 && data.value <= 8){
        uvIndexValue.classList = "yellow "
    }
    else if(data.value > 8) {
        uvIndexValue.classList = "red"
    };

    uvData.appendChild(uvIndexValue);
}

var fetchFiveDay = function(city){
    var apiKey = `b3c31541a930e81218d1e916ac9ed49a`;
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    fetch(apiURL).then(function(response) {
        response.json().then(function(data) {
           displayFiveDay(data);
        });
    });
};

var fiveDay = document.querySelector("#fiveday-header");
var fiveDayContainer = document.querySelector("#fiveday-container");
var displayFiveDay = function(data) {
    console.log(data);

    var forecast = data.list;
        for(var i = 5; i < forecast.length; i = i + 8) {
       var fiveDayForcast = forecast[i];
       var fiveDayConditions = document.createElement("div");

    //    var weatherIcon = document.createElement("img")
    //    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${fiveDayForecast.weather[0].icon}@2x.png`);  

       var forecastDate = document.createElement("span");
       forecastDate.textContent = moment.unix(fiveDayForcast.dt).format("YYYY-MM-DD ");
        
       var fiveDayTemp = document.createElement("span");
       fiveDayTemp.textContent = fiveDayForcast.main.temp + "°C ";
       
       var fiveDayHumidity = document.createElement("span");
       fiveDayHumidity.textContent = fiveDayForcast.main.humidity + "% ";

       var fiveDayWind = document.createElement("span");
       fiveDayWind.textContent = fiveDayForcast.wind.speed + " km/h ";

    //    fiveDayConditions.appendChild(weatherIcon);
       fiveDayConditions.appendChild(forecastDate);
       fiveDayConditions.appendChild(fiveDayTemp);
       fiveDayConditions.appendChild(fiveDayHumidity);
       fiveDayConditions.appendChild(fiveDayWind);

       fiveDayContainer.appendChild(fiveDayConditions);
    }
}
cityForm.addEventListener("submit", formSumbitHandler);

//create h3
//set value 
//div class 
//repeat for eahc, appendchild to fiveday conditions