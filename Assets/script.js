//Register and get the openWeather APIKey

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
//2. Add eventListener to the search button when clicked, to display the corresponsing weather details for the user searched city

    //2A Grab the value of the user entered city name input
    
    //2B Send an ajax call to get the current and forecast weather data for that city using 'APIKey' and 'city' parameters

    //2C Add the city to the searched history list in the local storage. Validate if it already exists and logic to handle accordingly

    //2D Add the city to the searched history list on the UI 

    //2E Display the ajax response data received for current and forecast weather on the UI
            // Map the keys of the required data from the response to the appropriate HTML element for current and forecast weather
            // Include the logic to color code the UV index based on value
            // Create a loop to display the 5-day forecast weather


/* Since almost the entire code is repeated on page load and when user clicks on button, code refactoring will be done at the end.*/