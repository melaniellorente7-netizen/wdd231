const myTown = document.querySelector('#town');
const myDescription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');
const myGraphic = document.querySelector('#graphic');
const myForecast = document.querySelector('#forecast');

const myKey = "524212b13221bf847301fe6560b73b99";
const myLat = "-34.3757";
const myLong = "-55.2372";


const myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;
const forecastURL =  `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

async function apiFetch () {
    try {
        const response = await fetch(myURL);
        const forecastResponse = await fetch(forecastURL);
        if (response.ok && forecastResponse.ok) {
            const data = await response.json();
            const forecastData = await forecastResponse.json();
            displayResults(data);
            displayForecast(forecastData);
        } else {
            throw Error (await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {

    myTown.innerHTML = data.name
    myDescription.innerHTML = data.weather[0].description
    myTemperature.innerHTML = `${data.main.temp}&deg;F` 
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    myGraphic.setAttribute('SRC', iconsrc)
    myGraphic.setAttribute('alt', data.weather[0].description)
}

function displayForecast(data){
    const dailyData = {};

    data.list.forEach((entry) => {
        const date = entry.dt_txt.split(' ')[0];
        const hour = entry.dt_txt.split(' ')[1];

        if (hour === "12:00:00") {
            dailyData[date] = entry;
        }
    });

    const days = Object.keys(dailyData).slice(0, 3);

    myForecast.innerHTML = "";

    days.forEach((date) => {
        const entry = dailyData[date];
        const dayName = new Date(date + 'T12:00:00').toLocaleDateString('es-UY', {weekdat:'short'});
        const temp = Math.round(entry.main.temp);
        const icon = entry.weather[0].icon;

        const dayCard = document.createElement('div');
        dayCard.classList.add('forecast-day');
        dayCard.innerHTML = `
            <p class="forecast-label">${dayName}</p>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${entry.weather[0].description}" class="forecast-icon">
            <p class="forecast-temp">${temp}&deg;C</p>
        `;
        myForecast.appendChild(dayCard);
    });
}

apiFetch();