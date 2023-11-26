const input = document.getElementById("value");
const btn = document.getElementById("btn");
const currentWeather = document.getElementById("weat");
const mainDiv = document.getElementById("main-div");
const locationName = document.getElementById("locationName");
const placeName = document.getElementById("placeName");
const temp = document.getElementById("temp");
const ha = document.getElementById("humidity");
const weather = document.getElementById("weather-11");

// Main Function
async function getWeather() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=e1db4f466c1ed08bb54b95cb19cfbe03`,
    {
      mode: "cors",
    }
  );
  const weatherData = await response.json();
  console.log(weatherData);
  // Feels Like
  const feelLike = celsius(weatherData.main.feels_like);
  temp.textContent = Math.round(feelLike) + "°";

  // Main temp
  const cel = celsius(weatherData.main.temp);
  currentWeather.textContent = Math.round(cel) + "°";

  const humidity = weatherData.main.humidity;
  ha.textContent = humidity + "%";
  console.log(humidity + "%");

  const weatherDescription = weatherData.weather[0].main;
  weather.textContent = weatherDescription;
  console.log(weatherDescription);
  inputValue();
  input.value = "";
}

// Longitude and Latitude
async function longitude() {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&appid=e1db4f466c1ed08bb54b95cb19cfbe03
  `,
    {
      mode: "cors",
    }
  );
  try {
    const long = await response.json();
    const latitude = long[0].lat;
    const longitude = long[0].lon;

    async function foreCastDate() {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=e1db4f466c1ed08bb54b95cb19cfbe03
        `,
        {
          mode: "cors",
        }
      );
      const fore = await response.json();
      // console.log(fore);
    }
    foreCastDate();
  } catch (error) {
    console.error("Error fetching location data:", error);
  }
}

// converting to celsius
function celsius(value) {
  return value - 273.15;
}

// Text Value
function inputValue() {
  placeName.textContent = input.value;
}

btn.addEventListener("click", getWeather);
btn.addEventListener("click", longitude);
