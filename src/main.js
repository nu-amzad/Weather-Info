import axios from 'axios';

let searchbar = document.getElementById('search-box');
let btn = document.getElementById('search-btn');
let temp = document.getElementById('temp');
let weat = document.getElementById('weather');
let livloc = document.getElementById('live-loc');
let citycountry = document.getElementById('city-Country');
let cityName;

// Helper function to convert Kelvin to Celsius
function kelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

// Function to handle the API call for city name
async function getdata(value) {
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: value,  // City name
        appid: '4a0470befc3535138ebf692dd9865e7c'  // Your API key
      }
    });
    return response.data;  // Return the JSON response data directly
  } catch (error) {
    console.error('Error:', error);
    citycountry.innerText = "Error: City not found.";
    return null;
  }
}

// Function to handle the API call for latitude and longitude
async function getdataLL(value1, value2) {
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: value1,  // Latitude
        lon: value2,  // Longitude
        appid: '4a0470befc3535138ebf692dd9865e7c',  // Your API key
        lang: 'en'  // Language (English)
      }
    });
    return response.data;  // Return the JSON response data directly
  } catch (error) {
    console.error('Error:', error);
    citycountry.innerText = "Error: Unable to fetch location data.";
    return null;
  }
}

// Geolocation success callback
async function locationSuccess(position) {
  const llreturnedData = await getdataLL(position.coords.latitude, position.coords.longitude);
  if (llreturnedData) {
    let tocel = kelvinToCelsius(llreturnedData.main.temp);
    temp.textContent = `Temperature: ${tocel.toFixed(2)}°C`;
    weat.textContent = `Weather: ${llreturnedData.weather[0].description.toUpperCase()}`;
    let country = countryCodes[llreturnedData.sys.country];
    citycountry.innerText = llreturnedData.name.toUpperCase() === country.toUpperCase()
      ? country.toUpperCase()
      : `${llreturnedData.name.toUpperCase()}, ${country.toUpperCase()}`;
  } else {
    citycountry.innerText = "City not found or invalid API response.";
  }
}

// Geolocation failure callback
function locationFailed() {
  console.log('Cannot access location');
  citycountry.innerText = "Cannot access location.";
}

// Search button event listener
btn.addEventListener('click', async () => {
  cityName = searchbar.value.toLowerCase();
  searchbar.value = '';  // Clear search bar
  let returnedData = await getdata(cityName);

  if (returnedData && returnedData.main && returnedData.sys) {
    let tocel = kelvinToCelsius(returnedData.main.temp);
    temp.textContent = `Temperature: ${tocel.toFixed(2)}°C`;
    weat.textContent = `Weather: ${returnedData.weather[0].description.toUpperCase()}`;
    let country = countryCodes[returnedData.sys.country];
    citycountry.innerText = returnedData.name.toUpperCase() === country.toUpperCase()
      ? country.toUpperCase()
      : `${returnedData.name.toUpperCase()}, ${country.toUpperCase()}`;
  } else {
    citycountry.innerText = "City not found or invalid API response.";
  }
});

// Live location button event listener
livloc.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(locationSuccess, locationFailed);
});


//openweather api only provides country code not country Name so im using a MAP

const countryCodes = {
  "AF": "Afghanistan",
  "AL": "Albania",
  "DZ": "Algeria",
  "AS": "American Samoa",
  "AD": "Andorra",
  "AO": "Angola",
  "AI": "Anguilla",
  "AQ": "Antarctica",
  "AG": "Antigua and Barbuda",
  "AR": "Argentina",
  "AM": "Armenia",
  "AW": "Aruba",
  "AU": "Australia",
  "AT": "Austria",
  "AZ": "Azerbaijan",
  "BS": "Bahamas",
  "BH": "Bahrain",
  "BD": "Bangladesh",
  "BB": "Barbados",
  "BY": "Belarus",
  "BE": "Belgium",
  "BZ": "Belize",
  "BJ": "Benin",
  "BM": "Bermuda",
  "BT": "Bhutan",
  "BO": "Bolivia",
  "BA": "Bosnia and Herzegovina",
  "BW": "Botswana",
  "BR": "Brazil",
  "BN": "Brunei",
  "BG": "Bulgaria",
  "BF": "Burkina Faso",
  "BI": "Burundi",
  "KH": "Cambodia",
  "CM": "Cameroon",
  "CA": "Canada",
  "CV": "Cape Verde",
  "KY": "Cayman Islands",
  "CF": "Central African Republic",
  "TD": "Chad",
  "CL": "Chile",
  "CN": "China",
  "CO": "Colombia",
  "KM": "Comoros",
  "CD": "Congo (DRC)",
  "CG": "Congo (Republic)",
  "CR": "Costa Rica",
  "HR": "Croatia",
  "CU": "Cuba",
  "CY": "Cyprus",
  "CZ": "Czech Republic",
  "DK": "Denmark",
  "DJ": "Djibouti",
  "DM": "Dominica",
  "DO": "Dominican Republic",
  "EC": "Ecuador",
  "EG": "Egypt",
  "SV": "El Salvador",
  "GQ": "Equatorial Guinea",
  "ER": "Eritrea",
  "EE": "Estonia",
  "ET": "Ethiopia",
  "FJ": "Fiji",
  "FI": "Finland",
  "FR": "France",
  "GA": "Gabon",
  "GM": "Gambia",
  "GE": "Georgia",
  "DE": "Germany",
  "GH": "Ghana",
  "GR": "Greece",
  "GD": "Grenada",
  "GT": "Guatemala",
  "GN": "Guinea",
  "GW": "Guinea-Bissau",
  "GY": "Guyana",
  "HT": "Haiti",
  "HN": "Honduras",
  "HU": "Hungary",
  "IS": "Iceland",
  "IN": "India",
  "ID": "Indonesia",
  "IR": "Iran",
  "IQ": "Iraq",
  "IE": "Ireland",
  "IL": "Israel",
  "IT": "Italy",
  "JM": "Jamaica",
  "JP": "Japan",
  "JO": "Jordan",
  "KZ": "Kazakhstan",
  "KE": "Kenya",
  "KI": "Kiribati",
  "KP": "North Korea",
  "KR": "South Korea",
  "KW": "Kuwait",
  "KG": "Kyrgyzstan",
  "LA": "Laos",
  "LV": "Latvia",
  "LB": "Lebanon",
  "LS": "Lesotho",
  "LR": "Liberia",
  "LY": "Libya",
  "LI": "Liechtenstein",
  "LT": "Lithuania",
  "LU": "Luxembourg",
  "MG": "Madagascar",
  "MW": "Malawi",
  "MY": "Malaysia",
  "MV": "Maldives",
  "ML": "Mali",
  "MT": "Malta",
  "MH": "Marshall Islands",
  "MR": "Mauritania",
  "MU": "Mauritius",
  "MX": "Mexico",
  "FM": "Micronesia",
  "MD": "Moldova",
  "MC": "Monaco",
  "MN": "Mongolia",
  "ME": "Montenegro",
  "MA": "Morocco",
  "MZ": "Mozambique",
  "MM": "Myanmar (Burma)",
  "NA": "Namibia",
  "NR": "Nauru",
  "NP": "Nepal",
  "NL": "Netherlands",
  "NZ": "New Zealand",
  "NI": "Nicaragua",
  "NE": "Niger",
  "NG": "Nigeria",
  "NO": "Norway",
  "OM": "Oman",
  "PK": "Pakistan",
  "PW": "Palau",
  "PA": "Panama",
  "PG": "Papua New Guinea",
  "PY": "Paraguay",
  "PE": "Peru",
  "PH": "Philippines",
  "PL": "Poland",
  "PT": "Portugal",
  "QA": "Qatar",
  "RO": "Romania",
  "RU": "Russia",
  "RW": "Rwanda",
  "KN": "Saint Kitts and Nevis",
  "LC": "Saint Lucia",
  "VC": "Saint Vincent and the Grenadines",
  "WS": "Samoa",
  "SM": "San Marino",
  "ST": "Sao Tome and Principe",
  "SA": "Saudi Arabia",
  "SN": "Senegal",
  "RS": "Serbia",
  "SC": "Seychelles",
  "SL": "Sierra Leone",
  "SG": "Singapore",
  "SK": "Slovakia",
  "SI": "Slovenia",
  "SB": "Solomon Islands",
  "SO": "Somalia",
  "ZA": "South Africa",
  "SS": "South Sudan",
  "ES": "Spain",
  "LK": "Sri Lanka",
  "SD": "Sudan",
  "SR": "Suriname",
  "SE": "Sweden",
  "CH": "Switzerland",
  "SY": "Syria",
  "TW": "Taiwan",
  "TJ": "Tajikistan",
  "TZ": "Tanzania",
  "TH": "Thailand",
  "TL": "Timor-Leste",
  "TG": "Togo",
  "TO": "Tonga",
  "TT": "Trinidad and Tobago",
  "TN": "Tunisia",
  "TR": "Turkey",
  "TM": "Turkmenistan",
  "TV": "Tuvalu",
  "UG": "Uganda",
  "UA": "Ukraine",
  "AE": "United Arab Emirates",
  "GB": "United Kingdom",
  "US": "United States",
  "UY": "Uruguay",
  "UZ": "Uzbekistan",
  "VU": "Vanuatu",
  "VA": "Vatican City",
  "VE": "Venezuela",
  "VN": "Vietnam",
  "YE": "Yemen",
  "ZM": "Zambia",
  "ZW": "Zimbabwe"
};