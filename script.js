// Variáveis e seleção de elementos
const apiKey = "f57695816e3c138a7e222f2e119a1678";
const apiCountryURL = "https://flagsapi.com/BR/flat/24.png";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const countryElement = document.querySelector("#country");
const temperatureElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const humidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");
const sensationElement = document.querySelector("#sensation span");

const weatherContainer = document.querySelector("#weather-data");

// Funções

// -acessa os dados da API
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
};

// mostra os dados na tela
const showWatherData = async (city) => {
    const data = await getWeatherData(city);

    console.log(data);

    cityElement.innerText = data.name;
    temperatureElement.innerHTML = parseInt(data.main.temp);
    descElement.innerHTML = data.weather[0].description;
    weatherIconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    countryElement.setAttribute(
        "src",
        `https://flagsapi.com/${data.sys.country}/flat/24.png`
    );
    humidityElement.innerHTML = `${data.main.humidity}%`;
    windElement.innerHTML = `${parseInt(data.wind.speed)} km/h`;
    sensationElement.innerHTML = `Sensação Térmica: ${parseInt(
        data.main.feels_like
    )}°C`;

    weatherContainer.classList.remove("hide");
};

// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWatherData(city);
});

// -configurando a tecla enter
cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;

        showWatherData(city);
    }
});
