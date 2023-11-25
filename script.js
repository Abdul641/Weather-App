const input = document.getElementById("value");
const btn = document.getElementById("btn");
const currentWeather = document.getElementById("weat");
const mainDiv = document.getElementById("main-div");
const locationName = document.getElementById("locationName");
const placeName = document.getElementById("placeName");

const LatitudeValue = [{}];
const LongitudeValue = [{}];

// Text Value
function inputValue() {
  placeName.textContent = input.value;
}

// Main Function
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

  inputValue();
  input.value = "";
}

// converting to celsius
function celsius(value) {
  return value - 273.15;
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
      console.log(fore);
    }
    foreCastDate();

    //LatitudeValue.push(latitude);
    //LongitudeValue.push(longitude);
    // console.log(`Latitude of ${input.value}`, LatitudeValue);
    // console.log(`Longitude of ${input.value}`, LongitudeValue);
  } catch (error) {
    console.error("Error fetching location data:", error);
  }
}

btn.addEventListener("click", getWeather);
btn.addEventListener("click", longitude);
/*
async function foreCastDate() {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${LatitudeValue}&lon=${LongitudeValue}&appid=e1db4f466c1ed08bb54b95cb19cfbe03
    `,
    {
      mode: "cors",
    }
  );
  const fore = await response.json();
  console.log(fore);
}
*/
