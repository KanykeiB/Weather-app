const form = document.forms['formClass'];
const input = form.content;
const cityName = document.getElementById('cityName');
const countryName = document.getElementById('countryName');
const localDate = document.getElementById('localDate');
const localTime = document.getElementById('localTime');
const mainIcon = document.getElementById("main-icon");
const innerError = document.querySelector('.innerText');
console.log(innerError.innerText)
const mainTemperature = document.getElementById('mainTemperature');
const stateOfWeather = document.getElementById('stateOfWeather');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const weatherCard = document.querySelector('.weatherCard.hide-panel')
const defaultText = document.querySelector('.default-text')

const API = {
    key: "d1fea7acad564fb898872123221412",
    base: "http://api.weatherapi.com/v1/current.json"
}
window.addEventListener('keypress', search)


// // Functions
function setDefault(){
    input.value = ''
}
function getCurrentDate(date){
    let d = new Date(date).toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric', weekday: 'long'})
    return d
}
getCurrentDate()

function search(e){
if (e.keyCode === 13 && input.value) {
    e.preventDefault();
    let query = `${input.value}`;
    async function getWeather(API){
        try{
        defaultText.classList.add('hide-panel');
        weatherCard.classList.remove('hide-panel')
        let urlGet = await fetch(`${API.base}?key=${API.key}&q=${query}`)
        const data =  await urlGet.json();
        cityName.innerText = `${data.location.name} , ${data.location.country}`;
        let date = data.location.localtime.split(' ').shift()
        localDate.innerText = `${getCurrentDate(date)}`;
        localTime.innerText = `${data.location.localtime.split(' ').pop()}`;
        humidity.innerText = `Humidity: ${data.current.humidity} %`
        feelsLike.innerText = `Feels Like: ${Math.floor(data.current.feelslike_c)} °`
        wind.innerText = `Wind:  ${data.current.wind_kph} kph`
        mainTemperature.innerText = `${Math.floor(data.current.temp_c)} °C`
        stateOfWeather.innerText = `${data.current.condition.text}`
        mainIcon.src = `http:${data.current.condition.icon}`
        setDefault()
        } catch(e){
            defaultText.classList.remove('hide-panel')
            innerError.innerText = 'No matching location found';
            weatherCard.classList.add('hide-panel')
            setDefault()
        }
    }
    getWeather(API)
}
}
