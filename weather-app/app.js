const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherContainer = document.getElementById("weatherContainer");


function getWeatherText(code) {

    if (code === 0) {
        return "ท้องฟ้าแจ่มใส";
    } else if (code === 1 || code === 2 || code === 3) {
        return "มีเมฆบางส่วน";
    } else if (code === 45 || code === 48) {
        return "มีหมอก";
    } else if (code >= 51 && code <= 57) {
        return "มีฝนปรอยๆ";
    } else if (code >= 61 && code <= 67) {
        return "มีฝน";
    } else if (code >= 71 && code <= 77) {
        return "มีหิมะ";
    } else if (code >= 80 && code <= 82) {
        return "ฝนตกหนัก";
    } else if (code >= 95 && code <= 99) {
        return "พายุฝนฟ้าคะนอง";
    } else {
        return "ไม่ทราบสภาพอากาศ";
    }
}


async function getWeather(city) {

    const locationUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const locationResponse = await fetch(locationUrl);

    if (!locationResponse.ok) {
        throw new Error("ไม่สามารถค้นหาข้อมูลเมืองได้");
    }

    const locationData = await locationResponse.json();

    if (!locationData.results || locationData.results.length === 0) {
        throw new Error(`ไม่พบเมือง: ${city}`);
    }

    const place = locationData.results[0];

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;

    const weatherResponse = await fetch(weatherUrl);

    if (!weatherResponse.ok) {
        throw new Error(`ไม่สามารถดึงข้อมูล ${city} ได้`);
    }

    const data = await weatherResponse.json();

    return {
        city: place.name,
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        wind: data.current.wind_speed_10m,
        weatherCode: data.current.weather_code
    };
}


function displayWeather(weather) {

    const card = document.createElement("div");

    card.className = "weather-card";

    card.innerHTML = `
        <h2>${weather.city}</h2>

        <div class="temperature">
            ${Math.round(weather.temperature)} °C
        </div>

        <p class="condition">
            ${getWeatherText(weather.weatherCode)}
        </p>

        <div class="weather-details">

            <div class="detail">
                <span class="label">💧 Humidity</span>
                <span>${weather.humidity} %</span>
            </div>

            <div class="detail">
                <span class="label">💨 Wind</span>
                <span>${weather.wind} km/h</span>
            </div>

        </div>
    `;

    weatherContainer.appendChild(card);
}


async function searchCities() {

    const input = cityInput.value.trim();

    if (input === "") {
        error.textContent = "กรุณากรอกชื่อเมือง";
        return;
    }

    const cities = input
        .split(",")
        .map(city => city.trim())
        .filter(city => city !== "");

    loading.textContent = "กำลังโหลดข้อมูล...";
    error.textContent = "";

    weatherContainer.innerHTML = "";

    try {

        const results = await Promise.all(
            cities.map(city => getWeather(city))
        );

        results.forEach(weather => {
            displayWeather(weather);
        });

    } catch (err) {

        error.textContent = err.message;

    } finally {

        loading.textContent = "";

    }
}

searchButton.addEventListener("click", searchCities);

cityInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        searchCities();
    }

});

searchCities();