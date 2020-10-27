const APIKey = "fa2f3597f83a06c3c808a388a5613793";
let searchCityList = JSON.parse(localStorage.getItem("searchCityList")) || [];



$('#searchBtn').on("click", function(event){
    event.preventDefault();
    const searchedCity = $('#inputSearch').val().trim();
    console.log (searchedCity);
    if(searchedCity === ""){
        return;
    } 
    
    // const cityExistsCheck = function(){
    //     isPresent = false;
    //     for(let i=0; i<searchCityList.length; i++){
    //         console.log(searchCityList[i], ((searchCityList.length)-(i+1)));
    //         console.log(searchCityList[i][(searchCityList.length)-(i+1)]);
    //         if (searchedCity === (searchCityList[i][(searchCityList.length)-1])){
    //             isPresent = true;
    //         }  
    //     }
    //     return isPresent;
    // }
    // console.log(cityExistsCheck());

    
    // const cityExistsCheck = function(){
    //     isPresent = false;
    //     for(let i=0; i<searchCityList.length; i++){
    //         //console.log(searchCityList[i], ((searchCityList.length)-(i+1)));
    //         //console.log(searchCityList[i][(searchCityList.length)-(i+1)]);
    //         if (searchedCity === (searchCityList[i])){
    //             isPresent = true;
    //         }  
    //     }
    //     return isPresent;
    // }

    // const cityExists = cityExistsCheck();

    // if(cityExists === true){
        
    // } 
    
    searchCityList =  searchCityList.filter(function(currentCity){
        return (searchedCity !== currentCity);
    })

      

    
    searchCityList.unshift(searchedCity);
    localStorage.setItem("searchCityList", JSON.stringify(searchCityList));
    $('.list-group').empty();
    for(let i=0; i<searchCityList.length; i++){
        const searchListBtn = $('<button>').addClass("list-group-item list-group-item-action");
        searchListBtn.text(searchCityList[i]);
        $('.list-group').append(searchListBtn);
    }
    



 

    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + APIKey + "&units=imperial";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        const icon = $('<img>');
        icon.attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png")   
        $('.cityName').html("<h3 id='cityDate'>" + response.name + " (" + moment().format('L') + ") " + "</h3>");
        $('.cityName').append(icon);
        const temp = $('.temp').text("Temperature: " + response.main.temp + " °F");
        const humidity = $('.humidity').text("Humidity: " + response.main.humidity + " %");
        const wind = $('.wind').text("Wind Speed: " + response.wind.speed + " MPH");
        queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(UVData) {
            console.log(UVData);
            $('.UVIndex').html("UV Index: <span id='UVIndex'>" + UVData.value + "</span>") ;
            const UVIndex = $('#UVIndex');
            if (UVIndex.text()<=2){
                UVIndex.attr("style", "background-color: rgb(31, 191, 29)");
            } else if (UVIndex.text()>7){
                UVIndex.attr("style", "background-color:red");
            } else{
                UVIndex.attr("style", "background-color:yellow");
                console.log(UVIndex.text());
            }
        });
        // UVIndex.css({"backgroundColor":"yellow"})
      
    })
    queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchedCity + "&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(forecastData) {
    console.log(forecastData);
    // for(let i=6; i<forecastData.list.length; i+8;){

    // }

    })
});