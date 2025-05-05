import "./styles.css";
import { DomEle } from "./scripts/dom.js";
import { getWeatherJSON } from "./scripts/get-weather.js";
import { displayDailyWeather } from "./scripts/day-boxes.js";
import { showSummary } from "./scripts/summary.js";

DomEle.searchBtn.addEventListener('click', e => {
  display();
})

async function display () {
  DomEle.contentDiv.innerHTML = "";
  const weatherJSON = await getWeatherJSON();
  showSummary(weatherJSON);
  displayDailyWeather(weatherJSON);
}