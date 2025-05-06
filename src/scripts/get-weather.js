import { UserInput } from "./get-user-input.js";

export let cachedWeather = null;

export async function getWeatherJSON () {
  try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${UserInput.location}?key=VZNB7QCW8AXR5TMH3UKK6ELY4`);
    const json = await response.json();
    cachedWeather = json;
    return json;
  } catch (err) {
    return err;
  }
}