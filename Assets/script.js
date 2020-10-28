//Register and get the openWeather APIKey

const APIKey = "fa2f3597f83a06c3c808a388a5613793";

/*On page load*/
//1. Display the weather details of the last searched city
    //1A Retrieve the searched history list from local storage

    //1B Grab the last searched city from the list

    //1C Send an ajax call to get the current and forecast weather data for that city using 'APIKey' and 'city' parameters

    //1D Populate the searched history list on the UI by dynamically generating the table-list

    //1E Display the received weather response data on the UI
            // Map the keys of the required data from the response to the appropriate HTML element for current and forecast weather
            // Include the logic to color code the UV index based on value
            // Create a loop to display the 5-day forecast weather


/*On search button click or when user clicks a city name from teh search history list*/
//2. Adds eventListener to the search button when clicked, to display the corresponsing weather details for the user searched city
$('#searchBtn').on("click", function(event){
    event.preventDefault();
    //2A Grabs the value of the user entered city name input
    const searchedCity = $('#inputSearch').val().trim();
    
    //2B Send an ajax request call to get the current and forecast weather data for that city using 'APIKey' and 'city' parameters
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + APIKey + "&units=imperial";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
    

    //2C Add the city to the searched history list in the local storage. Validate if it already exists and logic to handle accordingly

    //2D Add the city to the searched history list on the UI 

    //2E Display the ajax response data received for current and forecast weather on the UI
        // Map the keys of the required data from the response to the appropriate HTML element for current and forecast weather
        
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

            // Send another ajax request call to get the UVIndex using the latitude and longitude parameters from the previous response and API key
            queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + APIKey;
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(UVData) {
                console.log(UVData);
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

            // Send 3rd ajax request call for future weather data
            // Create a loop to display the 5-day forecast weather
});

/* Since almost the entire code is repeated on page load and when user clicks on button, code refactoring will be done at the end.*/