import "./styles.css";
import { DomEle } from "./scripts/dom.js";
import { getWeatherJSON } from "./scripts/get-weather.js";
import { displayDailyWeather } from "./scripts/day-boxes.js";
import { showSummary } from "./scripts/summary.js";
import { hourlyDivs } from "./scripts/hour-boxes.js";
import { cachedWeather } from "./scripts/get-weather.js";

DomEle.searchBtn.addEventListener('click', async (e) => {
  await preventMultipleQueries(display);
})

DomEle.contentDiv.addEventListener('click', async (event) => {
  preventMultipleQueries(async () => {
    if (event.target.closest('.day-div')) {
      const dayDiv = event.target.closest('.day-div');
      const dayIndex = dayDiv.dataset.index;
      if (dayIndex === document.querySelector('.day-div.selected').dataset.index) return;
      await changeHourly(dayIndex);
      styleChosenDiv(event);
    }
  })
})

async function display () {
  DomEle.contentDiv.innerHTML = "";
  const weatherJSON = await getWeatherJSON();
  showSummary(weatherJSON);
  await displayDailyWeather(weatherJSON);
}

async function changeHourly (index) {
  let target = cachedWeather.days[index].hours;
  let hourlyDiv = document.querySelector('.hour-div');

  hourlyDiv.innerHTML = "";

  const response = await Promise.all(target.map(hourlyDivs));
  response.forEach(div => hourlyDiv.appendChild(div));
}

function styleChosenDiv (event) {
  const dayDivs = document.querySelectorAll('.day-div');
  Array.from(dayDivs).forEach(div => {
    div.classList.remove('selected');
    event.target.closest('.day-div').classList.add('selected');
  })
}

let isLoading = false;
async function preventMultipleQueries (callback) {
  if (isLoading) return;
  isLoading = true;
  try {
    await callback();
  } catch (err) {
    console.log(err);
  } finally {
    isLoading = false;
  }
}

// Validation
// Loading style