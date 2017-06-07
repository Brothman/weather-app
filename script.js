// JavaScript File

$(document).ready(function() {
    

var getWeather = function(coordinates) {
    $.ajax({
        
        url: (`https://api.darksky.net/forecast/5afc85e307e98ba6bc2e9790fd77d033/${coordinates.lat},${coordinates.lng}`),
        
        jsonp: "callback",
        
        dataType: "jsonp",
        
        data: {
            q:"get the weather",
            format: "json"
        },
        
        success: function(response) {
            console.log(response);
            // $('h1').html(response.currently.apparentTemperature);
             
            makeDailyData(response.daily);
            appendHourlyData(response.hourly, response.timezone);
            dateAndTime(response.timezone);
             
             //Set Current Moment Weather
            $('h1.written-weather').html(response.currently.summary);
            $('h1.temperature').html(response.currently.apparentTemperature);

          
        }
    });
};

//${location} from user
var getLocation = function(location) {
    $.ajax({
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyDdUtl9i2Vy0IKNHWDqLXrSRq6G_Bk0Rww`,
        
        success: function(response) {
            console.log(response);
             
            
            var locationCoords = response.results[0].geometry.location
            getWeather(locationCoords);
        }


    })
};

function makeHourlyDate (hour, counter, timeZone) {
    var currentTime = moment.tz(timeZone).format('H');
    currentTime = parseInt(currentTime);
    currentTime += counter;
    if (currentTime >= 24) {
        currentTime -= 24
    }
    
    var hourlyDiv = 
      `<div class ="hour-weather-container">
        <div class ="hour-container">
          <h3 class="hour">
          ${currentTime}:00
        </h3>
        </div>
        <div class="hour-icon-container1 hour-icon-container">
          <h3 class="hour-icon1 hour-icon">
            ${setIconsHourly(hour)}
        </h3>
        </div>
        <div class="hour-hi-container1 hour-hi-container">
          <h3 class="hour-hi1 hour-hi">
          ${hour.apparentTemperature}
        </h3>
        </div>
        </div>`
      
      return hourlyDiv;
}

    var appendHourlyData = function(hourly, timeZone) {
        $('div.hour-weather-container').remove();
        var counter = 0;
        var first24 = hourly.data.slice(0,24)
        first24.forEach(function(hour) {
        $('div.hours-weather-container').append(makeHourlyDate(hour, counter, timeZone));
        counter = counter + 1;
    });
}

 
var makeDailyData = function(daily) {
     for (var i=1; i<9; i++) {
                 $(`h3.hi${i}`).html(daily.data[i-1].apparentTemperatureMax);
                 $(`h3.low${i}`).html(daily.data[i-1].apparentTemperatureMin);
                 
               setIconsDaily(i, daily.data[i-1]);
                  //WEATHER ICONS FINISH
             } 
             
}

function dateAndTime(timeZone) {
        //Get Day of the Week
                timeZoneGlobal = timeZone;
                var currentDate = moment.tz(timeZone).format('LLL');
                var date = new Date(currentDate);
                
                var weekday = new Array(7);
                    weekday[0] =  "Sunday";
                    weekday[1] = "Monday";
                    weekday[2] = "Tuesday";
                    weekday[3] = "Wednesday";
                    weekday[4] = "Thursday";
                    weekday[5] = "Friday";
                    weekday[6] = "Saturday";
                
                var dayOfWeek = weekday[date.getDay()];
                
                //Set daily dates and times
                var startLocation = date.getDay();
                for (var i=1; i<9; i++) {
                
                    $(`h3.${i}day`).html(weekday[startLocation]);
                    startLocation += 1;
                    
                     if (startLocation > 6) {
                        startLocation -= 7;
                    }
                }
   
                //Set Date and Time
             $('h3.date-and-time').html(dayOfWeek + ", " + currentDate);
}

/*function enterClicked () {
    $('input[name="location"]').keypress(function(e)) {
        //Enter pressed?
        if (e.which == 10 || e.which == 13) {
            $('input[name="location"]').form.submit();
        }
    }
}*/


function enterClicked () {
    $('input[name="location"]').keypress(function(e) {
        //Enter pressed?
        if (e.which == 10 || e.which == 13) {
            setLocationName($(this).val());
            getLocation($(this).val());
        }
    })
}

function setLocationName (locationPlace) {
    $('h3.locationName').html(locationPlace)
}
 
function setIconsDaily (i, data) {
    //Weather Icons START 
                 if (data.icon == "rain") {
                      $(`h3.icon${i}`).html('<i class="wi wi-rain"> </i>') ;
                 }
                  else if (data.icon.icon == "cloudy") {
                      $(`h3.icon${i}`).html('<i class="wi wi-cloudy"> </i>') ;
                 }
                 
                  else if (data.icon == "partly-cloudy-day") {
                      $(`h3.icon${i}`).html('<i class="wi wi-day-cloudy"> </i>') ;
                 }
                 else if (data.icon == "clear-day") {
                      $(`h3.icon${i}`).html('<i class="wi wi-day-sunny"> </i>') ;
                 }
                  else if (data.icon == "snow") {
                      $(`h3.icon${i}`).html('<i class="wi wi-snow"> </i>') ;
                 }
                  else if (data.icon == "wind") {
                      $(`h3.icon${i}`).html('<i class="wi wi-wind"> </i>') ;
                 }
                  else if (data.icon == "sleet") {
                      $(`h3.icon${i}`).html('<i class="wi wi-sleet"> </i>') ;
                 }
                  else if (data.icon == "partly-cloudy-night") {
                      $(`h3.icon${i}`).html('<i class="wi wi-day-cloudy"> </i>') ;
                 }
                  //WEATHER ICONS FINISH
}

function setIconsHourly (data) {
    //Weather Icons START 
                 if (data.icon == "rain") {
                      return '<i class="wi wi-rain"> </i>' ;
                 }
                  else if (data.icon == "cloudy") {
                      return '<i class="wi wi-cloudy"> </i>' ;
                 }
                 
                  else if (data.icon == "partly-cloudy-day") {
                       return '<i class="wi wi-day-cloudy"> </i>' ;
                 }
                 else if (data.icon == "clear-day") {
                       return '<i class="wi wi-day-sunny"> </i>' ;
                 }
                  else if (data.icon == "snow") {
                      return '<i class="wi wi-snow"> </i>' ;
                 }
                  else if (data.icon == "wind") {
                       return '<i class="wi wi-windy"> </i>';
                 }
                  else if (data.icon == "sleet") {
                      return '<i class="wi wi-sleet"> </i>';
                 }
                  else if (data.icon == "partly-cloudy-night") {
                      return '<i class="wi wi-day-cloudy"> </i>';
                 }
                 else if (data.icon == "clear-night") {
                      return '<i class="wi wi-night-clear"> </i>';
                 }
                  //WEATHER ICONS FINISH
}

var timeZoneGlobal = "";


//Actual functions to call

getLocation('New York');
enterClicked();
});
/*

$(document).ready(function() {
    getLocation("New York");
    enterClicked();
    setInterval (dateAndTime(timeZoneGlobal) ,60*1000);

});

*/