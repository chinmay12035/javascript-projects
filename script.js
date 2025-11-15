const API_KEY = "76b9cbf86b7423118bd60d2f2c213871";
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search");
const humidityEl = document.querySelector("#humidity");
const cityNameEl = document.querySelector("#City-name");
const temperatureEl = document.querySelector("#temperature");
const windSpeedEl = document.querySelector("#wind-speed");
const weatherImg = document.querySelector("#Weather-image");
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const icons = {
    Clear: "/images/clear.png",
    Clouds: "/images/clouds.png",
    Drizzle: "/images/drizzle.png",
    Mist: "/images/mist.png",
    Rain: "/images/rain.png",
    Snow: "/images/snow.png"
};


searchBtn.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (!city) return; 
    fetchWeather(city);
});


async function fetchWeather(city) {
    try {
        const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        const res = await fetch(url);

        if (!res.ok) throw new Error(res.status);

        const data = await res.json();

        cityNameEl.textContent = data.name;

        humidityEl.textContent = data.main?.humidity ?? "--";

        temperatureEl.textContent = `${Math.round(data.main?.temp)}°C`;

        windSpeedEl.textContent = data.wind?.speed ?? "--";

        // Prevents crash if weather array is missing or empty
        const type = data.weather?.[0]?.main;

        // Uses default icon if API returns unexpected weather condition
        weatherImg.src = icons[type] || "";

    } catch (err) {
        // Before: error only logged. Now UI receives feedback.
        cityNameEl.textContent = "City not found";
        humidityEl.textContent = "--";
        temperatureEl.textContent = "--";
        windSpeedEl.textContent = "--";
        weatherImg.src = "/images/default.png";
    }
}
