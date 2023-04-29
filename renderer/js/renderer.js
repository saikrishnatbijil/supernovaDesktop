const background = document.querySelector("#background");
const city = document.querySelector("#name");
const temp = document.querySelector("#temp");
const description = document.querySelector("#description");
const humidity = document.querySelector("#humidity");
const feelslike = document.querySelector("#feelslike");
const lowest = document.querySelector("#lowest");
const reload = document.querySelector("#reload");
const input = document.querySelector("#cityinput");
const form = document.querySelector("#form");

function getWeather(e) {
  if (e !== null) {
    e.preventDefault()
  }
    let url = `https://supernova.cyclic.app/weatherCity?name=${input.value}`;
  localStorage.setItem("city", input.value)
  console.log(input.value);
  axios
    .get(url)
    .then((response) => {
      displayWeatherData(response.data);
    })
    .catch((error) => {
      alertError("Error while loading..");
    });
}

function displayWeatherData(data) {
  console.log(data);
  city.innerText = data.name;
  temp.innerText = data.temp;
  description.innerText = data.description;
  humidity.innerText = data.humidity;
  feelslike.innerText = data.feels_like;
  lowest.innerText = data.lowest;
}

function alertError(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: "red",
      color: "white",
      textAlign: "center",
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  let city = localStorage.getItem("city"); 
  console.log("Loaded City ::: " + city)
  if (city !== null || city !== undefined) {
    input.value = city;
    getWeather(null)
  }
});
form.addEventListener("submit", (e) => getWeather(e));
