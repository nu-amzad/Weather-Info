let searchbar = document.getElementById('search-box');
let btn = document.getElementById('search-btn');
let temp = document.getElementById('temp');
let weat = document.getElementById('weather');
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

btn.addEventListener('click', async()=>{
  cityName = searchbar.value;
  searchbar.value = '';
  let returnedData = await getdata(cityName);
  let tocel = returnedData.main.temp - 273.15;
  temp.textContent = `Temprature: ${tocel.toFixed(2)}°C`;
  weat.textContent = `Weather: ${returnedData.weather[0].description.toUpperCase()}`;

})
