$(document).ready(function(){ 

    /*On page load - Display the weather details of the last searched city*/
    // Registers and get the openWeather APIKey
    const APIKey = "fa2f3597f83a06c3c808a388a5613793";
    // Retrieves the searched history list from local storage
    let searchCityList = JSON.parse(localStorage.getItem("searchCityList")) || [];
    // Grabs the last searched city from the list
    const lastSearched = searchCityList[0]
    //This function sends an ajax call to get the current and forecast weather data of the last searched city and display it on the UI as well as populate the search history list
    getDataAndRenderUI(lastSearched);

 
    /*Adds eventListener to the search button when clicked, to display the corresponsing weather details for the user searched city*/
    $('#searchBtn').on("click", function(event){
        event.preventDefault();
        // Grabs the value of the user entered city name input
        const searchedCity = $('#inputSearch').val().trim();
        // Validates and stops executing the function further if user clicks on search button without entering any value
        if(searchedCity === ""){
            return;
        }
        getDataAndRenderUI(searchedCity);
    });

    /*When user clicks a city name from the search history list*/
    $('.list-group').on("click", function(event){
        event.preventDefault();
        // used event delegation to handle th click events for all the search history list buttons
        if(event.target.matches("button")){
            // gets the text of the button clicked
            const searchedCity = $(event.target).text();
            getDataAndRenderUI(searchedCity);
        }
    })

    // This function adds the newly searched city to the search history list in local storage as well as on the UI
    function buildSearchHistoryList(searchedCity){
        // Handles the validation to ensure that the searched city does not already exist in the local storage array
        searchCityList =  searchCityList.filter(function(currentCity){
            return (searchedCity !== currentCity);
        }) 
        // pushing the new city at the 1st index of the searchCityList array to keep a track of the last searched city   
        searchCityList.unshift(searchedCity);
        // updates the array in local storage
        localStorage.setItem("searchCityList", JSON.stringify(searchCityList));

        // Empty/delete the entire search history list on the UI
        $('.list-group').empty();
        // Adds back all the cities from local storage array to the searched history list on the UI in order top-bottom
        for(let i=0; i<searchCityList.length; i++){
            const searchListBtn = $('<button>').addClass("list-group-item list-group-item-action");
            searchListBtn.text(searchCityList[i]);
            $('.list-group').append(searchListBtn);
        };
    }

    function getDataAndRenderUI(city){
        // Sends an ajax request call to get the current and forecast weather data for that city using 'APIKey' and 'city' parameters
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            $('#inputSearch').val("");
            buildSearchHistoryList(city);
            /*Map the keys of the required data from the response received to the appropriate HTML element for current and forecast weather and display it on the UI*/
            // creates an image tag for the icon
            const icon = $('<img>');
            // adds the src attribute to the img tag using open weather specified format to get icon URL
            icon.attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png")   
            // concatenates the city name from the response and current date using moment.js
            $('.cityName').html("<h3 id='cityDate'>" + response.name + " (" + moment().format('L') + ") " + "</h3>");
            // appends the icon to the h3 tag alongside city name and date
            $('.cityName').append(icon);
            // maps the temperature, humidity and wind speed from the response and displays it on the UI
            $('.temp').text("Temperature: " + response.main.temp + " °F");
            $('.humidity').text("Humidity: " + response.main.humidity + " %");
            $('.wind').text("Wind Speed: " + response.wind.speed + " MPH");

            // Sends another ajax request call to get the UVIndex using the latitude and longitude parameters from the previous response and API key
            queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + APIKey;
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(UVData) {
                // maps the UV Index value to its appropriate div and displays it on UI
                $('.UVIndex').html("UV Index: <span id='UVIndex'>" + UVData.value + "</span>") ;
                const UVIndex = $('#UVIndex');
                // Logic to color code the UV index based on value
                if (UVIndex.text()<=2){
                    UVIndex.attr("style", "background-color: rgb(31, 191, 29)");
                } else if (UVIndex.text()>7){
                    UVIndex.attr("style", "background-color:red");
                } else{
                    UVIndex.attr("style", "background-color:yellow");  
                }
            });
        });

        // Sends 3rd ajax request call for future weather data, using the searched city and API key as parameters
        queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(forecastData) {
            $('.displayForecast').empty();
            // Creates a loop to display the 5-day forecast weather. Since the response received provides data for every 3 hours, this loops through and maps every 8th element in the array
            for(let i=6; i<forecastData.list.length; i=i+8){
                // creates a div to hold each future day's weather data and appends it to the forecast weather section
                const forecastDay = $('<div>');
                // adds classes to the div for layout, styling and spacing
                forecastDay.addClass("col-2 blue-box m-2 p-2");
                // appends each div to its parent div that holds all the 5-day forecast divs
                $('.displayForecast').append(forecastDay);
                // craetes h6 tag for the date
                const date = $('<h6>');
                // maps the date from the forecast API response, converts it to the desired format using moment.js and displays it on UI
                date.text(moment((forecastData.list[i].dt_txt), "YYYY-MM-DD hh:mm:ss").format('MM/DD/YYYY'));
                // appends the date to the div
                forecastDay.append(date);
                // creates an img tag for the icon
                const icon = $('<img>');
                // adds the src attribute to the img tag using open weather specified format to get icon URL
                icon.attr("src", "http://openweathermap.org/img/wn/" + forecastData.list[i].weather[0].icon + ".png") 
                // appends the img tag to the div
                forecastDay.append(icon);
                // creates a p tag for temperature
                const temp = $('<p>');
                // maps the temperature value from response and displays it on UI
                temp.text("Temp: " + forecastData.list[i].main.temp + " °F");
                // appends the p tag to the div
                forecastDay.append(temp);
                // creates a p tag for humidity
                const humidity = $('<p>');
                // maps the humidity value from response and displays it on UI
                humidity.text("Humidity: " + forecastData.list[i].main.humidity + "%");
                // appends the p tag to the div
                forecastDay.append(humidity);
            };
        });        
    }
});
