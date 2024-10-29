const apiKey = "9c966fcb60c7a34798d03bb371ddfe91";

async function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        console.log(data); 

        const tempEl = document.getElementById("temp");
        const windEl = document.getElementById("wind");
        const humidEl = document.getElementById("humid");
        const cityEl = document.getElementById("city");
        const imgEl = document.querySelector(".images");

        tempEl.textContent = `${Math.floor(data.main.temp)} °C`; 
        cityEl.textContent = data.name;
        windEl.textContent = `${data.wind.speed} km/h`; 
        humidEl.textContent = `${data.main.humidity}%`;

        const weatherMain = data.weather[0].main;
        switch (weatherMain) {
            case "Clouds":
                imgEl.src = "assets/cloud.png";
                break;
            case "Clear":
                imgEl.src = "assets/clear.png";
                break;
            case "Rain":
                imgEl.src = "assets/rain.png";
                break;
            case "Drizzle":
                imgEl.src = "assets/drizzle.png";
                break;
            case "Mist":
                imgEl.src = "assets/mist.png"; 
                break;
            default:
                imgEl.src = "assets/default.png"; 
        }
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
    searchBox.value = ""; 
}

const searchBox = document.getElementById("searchInput");
const searchBtn = document.getElementById("button");

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        fetchWeatherData(city);
    } else {
        alert("Please enter a city name.");
    }
});
