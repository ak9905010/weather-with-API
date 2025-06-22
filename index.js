const boxWeather = document.querySelector(".weather-box");
boxWeather.classList.add("d-none");

const findBtn = document.getElementById("findBtn");
const cityInput = document.getElementById("cityInput");

const apiKey = "e26347435ce541e08b4210453252106";

const today = new Date();
const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
  today
); // Sunday

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
}); // format for date to Jun 23
const date = dateFormatter.format(today); // Jun 22

const nextDay = new Date(today);
nextDay.setDate(today.getDate() + 1);
const nextDayName = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
}).format(nextDay); //Monday
const nextDate = dateFormatter.format(nextDay); // Jun 23

const dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(today.getDate() + 2);
const dayAfterTomorrowName = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
}).format(dayAfterTomorrow); //Tuesday
const nextNextDate = dateFormatter.format(dayAfterTomorrow); // Jun 24


async function getWeather() {
  try {
    var response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=e26347435ce541e08b4210453252106&q=${cityInput.value}&days=3&aqi=no&alerts=no`
    );
    let data = await response.json();

    let cityName = data.location.name; // city name
    let currentTemp = data.current.temp_c; // current temperature of day 1
    let currentConditionText = data.current.condition.text; // current decreption of day 1
    let currentConditionIcon = data.current.condition.icon; // current img of day 1
    let forecast = data.forecast.forecastday;

    /* day 1 */
    document.getElementById("dayName1").innerHTML = dayName;
    document.getElementById("dayDate1").innerHTML = date;
    document.getElementById("cityName1").innerHTML = cityName;
    document.getElementById("cityTemp1").innerHTML = currentTemp + "°C";
    document.getElementById("wheatherStatus1").innerHTML = currentConditionText;
    document.getElementById("weatherImg1").src = `${currentConditionIcon}`;

    /* day 2 */
    document.getElementById("dayName2").innerHTML = nextDayName;
    document.getElementById("dayDate2").innerHTML = nextDate;
    document.getElementById("maxTemp2").innerHTML =
      forecast[1].day.maxtemp_c + "°C";
    document.getElementById("minTemp2").innerHTML =
      forecast[1].day.mintemp_c + "°C";
    document.getElementById(
      "weatherImg2"
    ).src = `${forecast[1].day.condition.icon}`;
    document.getElementById("wheatherStatus2").innerHTML =
      forecast[1].day.condition.text;

    /* day 3 */
    document.getElementById("dayName3").innerHTML = dayAfterTomorrowName;
    document.getElementById("dayDate3").innerHTML = nextNextDate;
    document.getElementById("maxTemp3").innerHTML =
      forecast[2].day.maxtemp_c + "°C";
    document.getElementById("minTemp3").innerHTML =
      forecast[2].day.mintemp_c + "°C";
    document.getElementById(
      "weatherImg3"
    ).src = `${forecast[2].day.condition.icon}`;
    document.getElementById("wheatherStatus3").innerHTML =
      forecast[2].day.condition.text;

    boxWeather.classList.remove("d-none");
    clearInput();
    //   console.log(currentTemp , currentConditionText , currentConditionIcon , forecast  , cityName , forecast[1].day.maxtemp_c);
  } catch (error) {
    alert("Invalid input ... ");
  }
}

findBtn.addEventListener("click", function () {
  getWeather();
});

function clearInput() {
  cityInput.value = null;
}
