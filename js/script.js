var searchWeather = document.querySelector("#city-input");

var buttonClickHandler = function(event) {
    event.preventDefault();
    var city = document.querySelectorAll("current-weather, future-conditions").values.trim();
    if (city) {
        getCurrentWeather(data, city);
        getWeatherForcast(data, city);
    } 
    saveWeather();
    searchHistory();

}


let currentWeather = {
    apiKey: "b3c31541a930e81218d1e916ac9ed49a",
    fetchCurrentWeather: function(city) {
        fetch(
            "http://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayCurrentWeather(data));
    }, 
    displayCurrentWeather: function(data) {
        const { name } = data;
        const { description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,description,temp,humidity,speed)
        document.querySelector(".city").innerText = name;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "humidity:" + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed:" + speed + "Km/h" ;
    },
  
};

searchWeather.addEventListener("click", buttonClickHandler);


//get UV
//Display UV

//get 5 day 
//display 5 day 