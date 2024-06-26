const locationInputJS = document.querySelector('#locationInput');
const locationButtonJS = document.querySelector('#locationButton');
const todayWeekDay = document.querySelector('#todayWeekDay');
const todayDate = document.querySelector('#todayDate');
const city = document.querySelector('#city');
const todayTemp = document.querySelector('#todayTemp');
const todayCond = document.querySelector('#todayCond');
const expectRain = document.querySelector('#expectRain');
const windSpeed = document.querySelector('#windSpeed');
const directionToday = document.querySelector('#directionToday');
const todayIcon = document.querySelector('#todayIcon');
const secondWeekDay = document.querySelector('#secondWeekDay');
const iconSecondDay = document.querySelector('#iconSecondDay');
const maxTemp = document.querySelector('#maxTemp');
const minTemp = document.querySelector('#minTemp');
const thirdWeekDay = document.querySelector('#thirdWeekDay');
const afterMaxTemp = document.querySelector('#afterMaxTemp');
const afterMinTemp = document.querySelector('#afterMinTemp');
const iconThirdDay = document.querySelector('#iconThirdDay');
const locationButton = document.querySelector('#locationButton')

locationInputJS.addEventListener('input', function(e){
    getData(e.target.value)
})



if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getData(${latitude} , ${longitude})
    })
}else{
    console.log('no position');
}

async function getData(locationData){
    let responce = await fetch(https://api.weatherapi.com/v1/forecast.json?q=${locationData}&days=3&key=1653aa8c25cf4c78b65101211242606)
    let data = await responce.json();
    console.log(data);
    displayToday(data);
    displaySecondDay(data);
    displayThirdDay(data);
}

/First day/ 
function displayToday(data){
let todayData=data.current.last_updated;
let date = new Date(todayData);
let today = date.toLocaleString('en-us',{weekday: 'long'})
let month = date.toLocaleDateString('en-us',{month:'long'});
let monthday = date.getDate();
let cityName = data.location.name;
let degree = ${data.current.temp_c } °C ;
let todayCondition = data.current.condition.text;
let humidity = data.current.humidity;
let wind = data.current.wind_kph;
let direction = data.current.wind_dir;
let icon = data.current.condition.icon;
todayWeekDay.innerHTML=today;
todayDate.innerHTML=${monthday} ${month};
city.innerHTML=cityName;
todayTemp.innerHTML=degree;
todayCond.innerHTML=todayCondition;
expectRain.innerHTML=humidity;
windSpeed.innerHTML=wind;
directionToday.innerHTML=direction;
todayIcon.setAttribute( 'src', 'https://' + icon )
}

/second day/ 
function displaySecondDay({forecast}){
let secondday = new Date(forecast.forecastday[1].date).toLocaleString('en-us',{weekday:'long'});
let maxTempSecondDay = ${forecast.forecastday[1].day.maxtemp_c} °C;
let minTempSecondDay = ${forecast.forecastday[1].day.mintemp_c} °C;
secondWeekDay.innerHTML=secondday;
maxTemp.innerHTML=maxTempSecondDay;
minTemp.innerHTML=minTempSecondDay;
iconSecondDay.setAttribute('src', 'https://' +forecast.forecastday[1].day.condition.icon);
}

/third day/ 
function displayThirdDay({forecast}){
    let thirdday = new Date(forecast.forecastday[2].date).toLocaleString('en-us',{weekday:'long'});
    let maxTempThirdDay = ${forecast.forecastday[2].day.maxtemp_c} °C;
    let minTempThirdDay = ${forecast.forecastday[2].day.mintemp_c} °C;
    thirdWeekDay.innerHTML=thirdday;
    afterMaxTemp.innerHTML=maxTempThirdDay;
    afterMinTemp.innerHTML=minTempThirdDay;
    iconThirdDay.setAttribute('src', 'https://' +forecast.forecastday[2].day.condition.icon);
    }