function fun() {
            var city = document.getElementById("city-input").value;
            document.getElementById("staticBackdropLabel").innerHTML = city;

            var mapFrame = document.getElementById("map-frame");
            var apiKey = "AIzaSyBO1hZyZsyekvCcOMoi01Pz_HoeBnv1Noc";
            var mapUrl = "https://www.google.com/maps/embed/v1/place?key=" + apiKey + "&q=" + encodeURIComponent(city);
            mapFrame.src = mapUrl;

            var weatherApiKey = "b9a0156dd67d84ed84ca7eeb3ceee265";
            var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${weatherApiKey}&units=metric`;

            fetch(weatherUrl)
                .then(response => response.json())
                .then(weatherData => {
                    if (weatherData.cod === 200) {
                        var weatherContainer = document.getElementById("message");
                        var weatherInfo = `
                            Temperature: ${weatherData.main.temp} °C
                            Weather: ${weatherData.weather[0].description}
                            Humidity: ${weatherData.main.humidity} %
                            Wind Speed: ${weatherData.wind.speed} m/s
                            Wind Direction: ${weatherData.wind.deg}°
                            Pressure: ${weatherData.main.pressure} hPa
                            Visibility: ${weatherData.visibility / 1000} km
                        `;
                        weatherContainer.value = weatherInfo;
                        var latitude =document.getElementById("lat");
                        var lat=weatherData.coord.lat;
                        latitude.value=lat;
                        var longitude =document.getElementById("lon");
                        var lon=weatherData.coord.lon;
                        longitude.value=lon;
                    } else {
                        alert("Weather data not found for " + city);
                    }
                })
                .catch(error => console.error("Error fetching weather data: ", error));
        }