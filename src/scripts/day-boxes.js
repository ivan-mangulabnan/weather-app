import { DomEle } from "./dom.js";
import { getGif } from "./get-gif.js";
import { format } from "date-fns";
import { showHourlyDiv } from "./hour-boxes.js";

export async function displayDailyWeather (weatherJSON) {
  const outerDiv = document.createElement('div');
  outerDiv.classList.add('weather-days');

  const days = weatherJSON.days;

  const dayDivs = await Promise.all(days.map(createDay));
  dayDivs.forEach((div, index) => {
    if (index === 0) div.classList.add('selected');
    div.setAttribute('data-index', index);
    outerDiv.appendChild(div)
  });

  const hourMainDiv = await showHourlyDiv(days[0].hours);

  DomEle.contentDiv.append(outerDiv, hourMainDiv);
}

async function createDay (day) {
  const wrapperDiv = document.createElement('div');
  const date = document.createElement('p');
  const img = document.createElement('img');
  const description = document.createElement('p');
  const temp = document.createElement('p');

  date.textContent = format(day.datetime, 'MMMM d, yyyy');

  try {
    img.src = await getGif(day.icon);
  } catch (err) {
    console.log(`Error Happened: ${err}`);
    img.alt = "Failed to load :(";
  }

  description.textContent = day.description;
  temp.textContent = `${day.temp}°F / ${((parseFloat(day.temp) - 32) * 5/9).toFixed(1)}°C`;

  wrapperDiv.classList.add('day-div');

  wrapperDiv.append(date, img, description, temp);
  return wrapperDiv;
}