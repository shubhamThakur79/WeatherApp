let inputbox = document.querySelector(".input");
const btn = document.querySelector(".btn");
let apiKey = "89a87c32aff9dbc153f667a74ebadb51";
let url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=`;
let img = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        let response = await fetch(url + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        let data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.floor(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
            img.src = "weather-app-img/images/clouds.png";
        } else if (data.weather[0].main == "Rain") {
            img.src = "weather-app-img/images/rain.png";
        } else if (data.weather[0].main == "Clear") {
            img.src = "weather-app-img/images/clear.png";
        } else if (data.weather[0].main == "Drizzle") {
            img.src = "weather-app-img/images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            img.src = "weather-app-img/images/mist.png";
        }

        let weather = document.querySelector(".weather-box");
        weather.style.display = "block";
        let card = document.querySelector(".card");
        card.style.marginTop = "20px";
        
    } catch (error) {
        alert("City not found! Please enter a valid city name.");
        document.querySelector(".city").innerHTML = "Not Found";
        document.querySelector(".city").style.color = "";
        document.querySelector(".temp").innerHTML = "";
        document.querySelector(".humidity").innerHTML = "";
        document.querySelector(".wind").innerHTML = "";
        img.src = "";
        inputbox.value=""
        console.log(error);
    }
}

btn.addEventListener("click", () => {
    let city = inputbox.value.trim();
    if (city === "" || city.length <= 3) {
        alert("Please enter a valid city name!");
        inputbox.value = "";
      
    } else {
        inputbox.style.color = "black"; // Reset input box color
        checkWeather(city);
    }
});
