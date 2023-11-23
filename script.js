const input = document.getElementById("value");
const btn = document.getElementById("btn");
const currentWeather = document.getElementById("weat");
const mainDiv = document.getElementById("main-div");
const locationName = document.getElementById("locationName");
const placeName = document.getElementById("placeName");

function inputValue() {
  placeName.textContent = input.value;
}

async function getWeather() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=e1db4f466c1ed08bb54b95cb19cfbe03`,
    {
      mode: "cors",
    }
  );
  const weatherData = await response.json();
  const cel = celsius(weatherData.main.temp);

  currentWeather.textContent = Math.round(cel) + "°";
  locationName.appendChild(currentWeather);

  console.log(Math.round(cel));
  inputValue();
  input.value = "";
}

btn.addEventListener("click", getWeather);

function celsius(value) {
  return value - 273.15;
}
