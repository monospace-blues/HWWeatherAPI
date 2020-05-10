// an array of cities
var cityArray = ["London", "Chicago", "Minneapolis", "Los Angeles", "New York City", "Seattle", "San Francisco", "Denver"];

// apiKey and variable for city
var apiKey = "ab12b04bb745a9ef9f0b904c28fb7bd1";
var cityURL = cityArray[0];

var queryWeatherURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=" + cityURL + "&appid=" + apiKey + "&units=imperial";


$(document).ready(function() { 
// elements id
var cityWeatherId = $("#cityWeather");
var cardDeckId = $(".card-deck");

// date method (current)
var date = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var today = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();


// tomorrow date
var tomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
var tomorrowStr = months[tomorrow.getMonth()] + " " + tomorrow.getDate() + ", " + tomorrow.getFullYear();


// Second date
var second = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2);
var secondDayStr = months[second.getMonth()] + " " + second.getDate() + ", " + second.getFullYear();


// Third date
var third = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 3);
var thirdDayStr = months[third.getMonth()] + " " + third.getDate() + ", " + third.getFullYear();


// Fourth date
var fourth = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4);
var fourthDayStr = months[fourth.getMonth()] + " " + fourth.getDate() + ", " + fourth.getFullYear();


// Fifth date
var fifth = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 5);
var fifthDayStr = months[fifth.getMonth()] + " " + fifth.getDate() + ", " + fifth.getFullYear();



// Current Weather
function currentWeather() {
    $.ajax({
        url: queryWeatherURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    
        // add the selected child and give it the name
        cityWeatherId.children("h3").text(response.name + " (" + today + ")");
        cityWeatherId.children("#temp").text("Temp: " + (Math.round(response.main.temp * 10) / 10) + "F");
        cityWeatherId.children("#humidity").text("Humidity: " + response.main.humidity + "%");
        cityWeatherId.children("#wind").text("Wind: " + response.wind.speed + "mph");
        cityWeatherId.children("#forecast").text("Forecast: " + response.weather[0].main);
    
    });
    
}

// api call for the forecast
var queryForecastURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=" + cityURL + "&appid=" + apiKey + "&units=imperial";

// Forecast
function forecastWeather() {
    $.ajax({
        url: queryForecastURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    
        // I'll use the 12PM hour selection as the base day for all 5 days
        // list[number]:
        // next day: 5, second day: 13, third day: 21, fourth day: 29, fifth day: 37
    
        var icontag = response.list[5].weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + icontag + ".png";
    
    
        // add the selected child and give it the name
        cardDeckId.children("#nextDay").children().children("h5").text(tomorrowStr);
        cardDeckId.children("#nextDay").children().children("#icon").children().attr("src", iconURL);
        cardDeckId.children("#nextDay").children().children(".temperature").text("Temp: " + Math.round(response.list[5].main.temp) + "F");
        cardDeckId.children("#nextDay").children().children(".humidity").text("Humidity: " + response.list[5].main.humidity + "%");
    
        cardDeckId.children("#secondDay").children().children("h5").text(secondDayStr);
        icontag = response.list[13].weather[0].icon;
        iconURL = "http://openweathermap.org/img/w/" + icontag + ".png";
        cardDeckId.children("#secondDay").children().children("#icon").children().attr("src", iconURL);
        cardDeckId.children("#secondDay").children().children(".temperature").text("Temp: " + Math.round(response.list[13].main.temp) + "F");
        cardDeckId.children("#secondDay").children().children(".humidity").text("Humidity: " + response.list[13].main.humidity + "%");
    
        cardDeckId.children("#thirdDay").children().children("h5").text(thirdDayStr);
        icontag = response.list[21].weather[0].icon;
        iconURL = "http://openweathermap.org/img/w/" + icontag + ".png";
        cardDeckId.children("#thirdDay").children().children("#icon").children().attr("src", iconURL);
        cardDeckId.children("#thirdDay").children().children(".temperature").text("Temp: " + Math.round(response.list[21].main.temp) + "F");
        cardDeckId.children("#thirdDay").children().children(".humidity").text("Humidity: " + response.list[21].main.humidity + "%");
    
        cardDeckId.children("#fourthDay").children().children("h5").text(fourthDayStr);
        icontag = response.list[29].weather[0].icon;
        iconURL = "http://openweathermap.org/img/w/" + icontag + ".png";
        cardDeckId.children("#fourthDay").children().children("#icon").children().attr("src", iconURL);
        cardDeckId.children("#fourthDay").children().children(".temperature").text("Temp: " + Math.round(response.list[29].main.temp) + "F");
        cardDeckId.children("#fourthDay").children().children(".humidity").text("Humidity: " + response.list[29].main.humidity + "%");
    
        cardDeckId.children("#fifthDay").children().children("h5").text(fifthDayStr);
        icontag = response.list[37].weather[0].icon;
        iconURL = "http://openweathermap.org/img/w/" + icontag + ".png";
        cardDeckId.children("#fifthDay").children().children("#icon").children().attr("src", iconURL);
        cardDeckId.children("#fifthDay").children().children(".temperature").text("Temp: " + Math.round(response.list[37].main.temp) + "F");
        cardDeckId.children("#fifthDay").children().children(".humidity").text("Humidity: " + response.list[37].main.humidity + "%");
        
    });
}

// removes the active class
function removeActiveButton () {
    var activeClass = $(".active");
    activeClass.removeClass("active");

}

// call the functions and let it do work
currentWeather();
forecastWeather();

// Event Listener for search
var searchCity = $("#searchCity");

searchCity.on("submit", function (event) {
    event.preventDefault();
    console.log($(this).children().val());

    $(this).children().attr("onfocus","this.value=''");

    // check if text matches what's inside the list
    for (var i = 0; i < cityArray.length; i++) {
        // if it does, we just select that list and get out of the function
        if ($(this).children().val() == cityArray[i]){
            removeActiveButton();
            cityURL = cityArray[i];

            // finds the attribute and activates
            var dataStr = ".list-group-item[data-name='" + cityArray[i] + "']";
            $(dataStr).addClass("active");

            // resets the url
            queryWeatherURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=" + cityURL 
                + "&appid=" + apiKey + "&units=imperial";
            queryForecastURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=" + cityURL + "&appid=" 
                + apiKey + "&units=imperial";

            // Calls function to render to webpage
            currentWeather();
            forecastWeather();
            // we leave the function
            return;

        }
    }
    
    // else, we continue and add it to the list
    cityURL = $(this).children().val();

    // we'll also add it to the array
    cityArray.push(cityURL);

    queryWeatherURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=" + cityURL 
        + "&appid=" + apiKey + "&units=imperial";
    queryForecastURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=" + cityURL + "&appid=" 
        + apiKey + "&units=imperial";

    currentWeather();
    forecastWeather();

    removeActiveButton();

    // we add a new button for the new city
    var addedBtn = $('<button type="button" class="list-group-item list-group-item-action active">')
    addedBtn.text(cityURL);
    addedBtn.attr("data-name", cityURL);
    $(".list-group").prepend(addedBtn);

});

// Event Listener for Button
$(".list-group-item").on("click", function(event) {
    event.preventDefault();
    // Getting the data-name for the city
    
    removeActiveButton();

    cityURL = $(this).attr("data-name");
    $(this).addClass("active");

    queryWeatherURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=" + cityURL 
        + "&appid=" + apiKey + "&units=imperial";
    queryForecastURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=" + cityURL + "&appid=" 
        + apiKey + "&units=imperial";

    currentWeather();
    forecastWeather();


});


});
