import { UserInput } from "./get-user-input.js";

export let cachedWeather = {
  location: null,
  data: null
};

export async function getWeatherJSON () {
  try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${UserInput.location}?key=BTXJXKDWCKW43S3YA86JHUVU8`);
    const json = await response.json();
    cachedWeather.location = UserInput.location;
    cachedWeather.data = json;
    return json;
  } catch (err) {
    return err;
  }
}