import { getGif } from "./get-gif.js";
import { parse, format } from "date-fns";

export async function showHourlyDiv (hours) {
  const mainWrapper = document.createElement('div');
  const innerDiv = document.createElement('div');

  const title = document.createElement('p');
  title.textContent = "HOURLY";

  console.log(hours);
  const response = await Promise.all(hours.map(hourlyDivs));
  response.forEach(div => innerDiv.appendChild(div));

  innerDiv.classList.add('hour-div');

  mainWrapper.append(title, innerDiv);
  return mainWrapper;
}

export async function hourlyDivs(time, event = null) {
  const wrapper = document.createElement('div');
  const hour = document.createElement('p');
  const img = document.createElement('img');
  const condition = document.createElement('p');
  const temp = document.createElement('p');

  const parsedTime = parse(time.datetime, 'HH:mm:ss', new Date());
  hour.textContent = format(parsedTime, 'hh:mm a');

  try {
    img.src = await getGif(time.icon);
  } catch (err) {
    console.log(`Error Happened: ${err}`);
    img.alt = "Failed to load :(";
  }

  condition.textContent = time.conditions;
  temp.textContent = `${time.temp}°F / ${((parseFloat(time.temp) - 32) * 5/9).toFixed(1)}°C`;

  wrapper.classList.add('hour-wrapper');
  
  if (event !== null) {

  }

  wrapper.append(hour, img, condition, temp);

  return wrapper;
}