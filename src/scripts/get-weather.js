import { UserInput } from "./get-user-input.js";

export let cachedWeather = null;

export async function getWeatherJSON () {
  try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${UserInput.location}?key=BTXJXKDWCKW43S3YA86JHUVU8`);
    const json = await response.json();
    cachedWeather = json;
    return json;
  } catch (err) {
    return err;
  }
}