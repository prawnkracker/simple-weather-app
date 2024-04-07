const apiKey = 'd1642f309267a04f3bad4ad230b7a606'

// Fetch weather information from API
function getWeather(){
    
    let search = document.getElementById('city').value;

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${apiKey}`
    
    if (!search) {
        alert('Please enter a city.');
        return;
    }

    fetch(weatherUrl)
        .then(r => r.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(e => {
            console.error('Error fetching weather data.', e);
            alert('Error fetching weather data. Please try again.');
        });
}
// Ask for user location and show weather (just search bar if user denies location access )
document.addEventListener('DOMContentLoaded', () => {
    const successCallback = (position) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`)
        .then(r => r.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(e => {
            console.error('Error fetching weather data.', e);
            alert('Error fetching weather data. Please try again.');
        });
    }

    const errorCallback = (error) => {
        console.log(error)

    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
    
    
})

// Display weather information after fetching from API
function displayWeather(data){
    const cityName = document.getElementById('city-name')
    const weatherIcon = document.getElementById('weather-icon')
    const tempDiv = document.getElementById('temp-div')
    const feelsLike = document.getElementById('feels-like')
    const humidityDiv = document.getElementById('humidity')
    const windDiv = document.getElementById('wind')
    const weatherDesc = document.getElementById('weather-description')

    if (data.cod === '404'){
        cityName.innerHTML = `<p>${data.message}</p>`;
        weatherIcon.style.display='none';
        tempDiv.innerHTML=''
        feelsLike.innerHTML=''
    } else {
        const city = data.name
        const country = data.sys.country
        const icon = data.weather[0].icon
        const temp = Math.round(data.main.temp)
        const feels = Math.round(data.main.feels_like)
        const wind = Math.round(data.wind.speed)
        const humidity = data.main.humidity
        const desc = data.weather[0].main

        cityName.innerHTML = `<h2>${city}, ${country}</h2>`

        weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
        weatherIcon.style.display = 'inline'

        tempDiv.innerHTML = `<p>
            <span class="material-symbols-outlined">thermostat</span>
             ${temp}°C
            </p>`

        feelsLike.innerHTML= `<p>Feels like: ${feels}°C</p>`

        humidityDiv.innerHTML = `<p><span class="material-symbols-outlined">
        humidity_percentage
        </span> ${humidity}</p>`

        windDiv.innerHTML = `<p><span class="material-symbols-outlined">
        airwave
        </span> ${wind}m/s`

        weatherDesc.innerHTML= `<h2>${desc}<h2>`
    }
}