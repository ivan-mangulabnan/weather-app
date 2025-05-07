import "./styles.css";
import { DomEle } from "./scripts/dom.js";
import { getWeatherJSON } from "./scripts/get-weather.js";
import { displayDailyWeather } from "./scripts/day-boxes.js";
import { showSummary } from "./scripts/summary.js";
import { hourlyDivs } from "./scripts/hour-boxes.js";
import { cachedWeather } from "./scripts/get-weather.js";

DomEle.searchBtn.addEventListener('click', async (e) => {
  if (DomEle.locationInput.value === cachedWeather.location) return;
  DomEle.contentDiv.innerHTML = "";
  await preventMultipleQueries(display, DomEle.contentDiv);
})

DomEle.contentDiv.addEventListener('click', async (event) => {
  if (event.target.closest('.day-div')) {
    const dayDiv = event.target.closest('.day-div');
    const dayIndex = dayDiv.dataset.index;
    const hourDiv = document.querySelector('.hour-div');
    if (dayIndex === document.querySelector('.day-div.selected').dataset.index) return;
    hourDiv.innerHTML = "";
    await preventMultipleQueries( async () => {
      await changeHourly(dayIndex);
    }, hourDiv);
    styleChosenDiv(event);
  }
})

async function display () {
  const weatherJSON = await getWeatherJSON();
  showSummary(weatherJSON);
  await displayDailyWeather(weatherJSON);
}

async function changeHourly (index) {
  let target = cachedWeather.data.days[index].hours;
  let hourlyDiv = document.querySelector('.hour-div');

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
async function preventMultipleQueries (callback, parent) {
  if (isLoading) return;

  isLoading = true;

  const loader = loading(parent);

  try {
    await callback();

  } catch (err) {
    console.log(err);

  } finally {
    isLoading = false;

    loader.remove();
  }
}

function loading (parent) {
  const wrapper = document.createElement('div');
  const p = document.createElement('p');

  p.textContent = "Loading...";

  wrapper.appendChild(p);
  parent.appendChild(wrapper);

  return wrapper;
}

// Validation