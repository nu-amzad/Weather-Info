let searchbar = document.getElementById('search-box');
let btn = document.getElementById('search-btn');
let temp = document.getElementById('temp');
let weat = document.getElementById('weather');
let livloc = document.getElementById('live-loc');
let cityName;

async function getdata(value){
  try{
  let datas = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=4a0470befc3535138ebf692dd9865e7c`);
  return await datas.json();
  }
  catch(error){
    return console.log(error);
  }
}

async function getdataLL(value1, value2){
  try{
  let datas = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${value1}&lon=${value2}&appid=4a0470befc3535138ebf692dd9865e7c&lang=en`);
  return await datas.json();
  }
  catch(error){
    return console.log(error);
  }
}


async function locationSuccess(position){
  const llreturnedData= await getdataLL(position.coords.latitude, position.coords.longitude);
  let tocel = llreturnedData.main.temp - 273.15;
  temp.textContent = `Tempreature: ${tocel.toFixed(2)}°C`;
  weat.textContent = `Weather: ${llreturnedData.weather[0].description.toUpperCase()}`;
}

function locationFailed(){
  console.log ('Cannto Access Location');
}

btn.addEventListener('click', async()=>{
  cityName = searchbar.value;
  searchbar.value = '';
  let returnedData = await getdata(cityName);
  let tocel = returnedData.main.temp - 273.15;
  temp.textContent = `Temprature: ${tocel.toFixed(2)}°C`;
  weat.textContent = `Weather: ${returnedData.weather[0].description.toUpperCase()}`;

})

livloc.addEventListener('click', async ()=>{
  navigator.geolocation.getCurrentPosition(locationSuccess,locationFailed);
})