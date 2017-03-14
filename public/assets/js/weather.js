if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(function (position) {
       loadWeather(position.coords.latitude + "," + position.coords.longitude);                                         //*checks that users browser supports geolocation API
    });
}   else {
    loadWeather("New York, NY", "");
}

$(document).ready(function () {
    setInterval(getWeather, 100000);                                                                                     //*makes sure browser refreshes weather quickly

});

function loadWeather(location, woeid) {
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit:'f',
        success:function (weather) {
            city = weather.city;
            temp = weather.temp+'&deg;';
            wcode = '<img class="weathericons" src= "assets/images/Weather/weathericons/' + weather.code + '.svg">';
            wind = '<p>' + weather.wind.speed + '</p><p>' + weather.units.speed + '</p>';
            humidity = weather.humidity + ' %';

            $(".location").text(city);
            $(".temperature").html(temp);
            $(".climate_bg").html(wcode);
            $(".windspeed").html(wind);
            $(".humidity").text(humidity);
        },
        
        error: function (error) {
            $(".error").html('<p>' + error + '</p>');
        }
    });
}