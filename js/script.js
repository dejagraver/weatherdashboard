var searchWeather = document.querySelector("#city-input");

var lat; 
var lon; 

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
        lat = data.coord.lat;
        lon = data.coord.lon;
        console.log(name,description,temp,humidity,speed)
        document.querySelector(".city").innerText = name;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "humidity:" + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed:" + speed + "Km/h" ;
    },
};

let UvIndex = {
    apiKey: "b3c31541a930e81218d1e916ac9ed49a",
    fetchUvIndex: function() {
        fetch(
        `https://api.openweathermap.org/data/2.5/uvi?appid=${this.apiKey}&lat=${lat}&lon=${lon}`
        )
        .then((response) => response.json())
        .then((data) => this.displayyUvIndex(data));
        console.log(data)
    },
    displayUvIndex: function(data) {
        const { value } = data.coord;
        document.querySelector("UV").innerText = value;
        console.log(value);
        if (data.value <= 2) {
            uvIndexValue.classList = "green"
        } else if (data.value > 2 && data.value <= 9){
            uvIndexValue.classList = "yellow"
        } else if (data.value > 8){
            uvIndexValue.classList = "red"
        }
    },
};
searchWeather.addEventListener("click", buttonClickHandler);

let weatherForcast = {
    apiKey: "b3c31541a930e81218d1e916ac9ed49a",
    fetchWeatherForcast: function() {
        fetch(
            "api.openweathermap.org/data/2.5/forecast?q="
            + city
            + "&units=metric&appid="
            + this.apiKey
            )

        .then((response) => response.json())
        .then((data) => this.displayWeatherForcast(data));
    },
    displayWeatherForcast = function(data) {
        for (let i = 0; i < localStorage.length; i++) {
            const { humidity } = data.list;
            const { temp } = data.list;
            const { speed } = data.wind;
            const { icon } = data.weather;
            document.querySelector(".fortemp").innerText = temp;
            document.querySelector(".forwind").innrText = speed;
            document.querySelector(".forhumidity").innerText = humidity;
            document.querySelector(".foricon").innerText = icon;

        }
    }
}

//get UV
//Display UV

//get 5 day 
//display 5 day 