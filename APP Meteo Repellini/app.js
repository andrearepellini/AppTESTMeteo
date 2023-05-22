// OpenWeather API key
const API_KEY = 'e86357ce2cfa00db441588d4253e9dfd';
// API URL per meteo attuale
const CURRENT_WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=it&appid=${API_KEY}&q=`;
// API URL per previsioni
const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?cnt=20&units=metric&lang=it&appid=${API_KEY}&q=`;

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const meteoIconOggi = document.getElementsByClassName("meteo-icon")[0];
const meteoIconDomani = document.getElementsByClassName("meteo-icon")[1];
const meteoIconDopoDomani = document.getElementsByClassName("meteo-icon")[2];
// oppure querySelectorAll

async function controllaMeteo(citta) {
    const response1 = await fetch(CURRENT_WEATHER_API_URL + citta);
    const response2 = await fetch(FORECAST_API_URL + citta);

    // controllo se il nome inserito è corretto
    if (response1.status == 404 || response2.status == 404) {
        document.querySelector(".errore2").style.display = "none";
        document.querySelector(".errore").style.display = "block";
    } else if (response1.status == 400 || response2.status == 400) {
        document.querySelector(".errore").style.display = "none";
        document.querySelector(".errore2").style.display = "block";
    } else if (response1.ok && response2.ok) {
        const data1 = await response1.json();
        const data2 = await response2.json();

        console.log(data1);
        console.log(data2);

        for (i = 0; i < 3; i++) {
            document.getElementsByClassName("citta")[i].innerText = data1.name;
        }
        document.getElementsByClassName("temperatura")[0].innerText = `${Math.round(data1.main.temp)}°C`;
        document.getElementsByClassName("umidita")[0].innerText = data1.main.humidity + "%";
        document.getElementsByClassName("vento")[0].innerText = `${Math.round(data1.wind.speed)} km/h`;

        document.getElementsByClassName("temperatura")[1].innerText = `${Math.round(data2.list[8].main.temp)}°C`;
        document.getElementsByClassName("umidita")[1].innerText = data2.list[8].main.humidity + "%";
        document.getElementsByClassName("vento")[1].innerText = `${Math.round(data2.list[8].main.humidity)} km/h`;

        document.getElementsByClassName("temperatura")[2].innerText = `${Math.round(data2.list[16].main.temp)}°C`;
        document.getElementsByClassName("umidita")[2].innerText = data2.list[16].main.humidity + "%";
        document.getElementsByClassName("vento")[2].innerText = `${Math.round(data2.list[16].main.humidity)} km/h`;

        let iconOggi = data1.weather[0].icon;
        let iconDomani = data2.list[8].weather[0].icon;
        let iconDopoDomani = data2.list[16].weather[0].icon;
        meteoIconOggi.src = `http://openweathermap.org/img/wn/${iconOggi}@4x.png`;
        meteoIconDomani.src = `http://openweathermap.org/img/wn/${iconDomani}@4x.png`;
        meteoIconDopoDomani.src = `http://openweathermap.org/img/wn/${iconDopoDomani}@4x.png`;

        document.querySelector("#meteoAttuale").style.backgroundImage = "url(https://source.unsplash.com/random?index=1)";
        document.querySelector("#previsioniDomani").style.backgroundImage = "url(https://source.unsplash.com/random?index=2)";
        document.querySelector("#previsioniDopoDomani").style.backgroundImage = "url(https://source.unsplash.com/random?index=4)";

        document.querySelector("#meteoCarousel").style.display = "block";
        document.querySelector(".errore").style.display = "none";
        document.querySelector(".errore2").style.display = "none";
    }

}

// quando viene cliccato il bottone controlla il meteo per la città nella barra
searchButton.addEventListener("click", function () {
    controllaMeteo(searchBox.value);
});

// anche quando viene premuto invio
searchBox.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        console.log("enter premuto");
        controllaMeteo(searchBox.value);
    }
});

