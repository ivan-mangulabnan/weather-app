import { UserInput } from "./get-user-input.js";

export async function getWeatherJSON () {
  try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${UserInput.location}/2025-05-05/2025-05-06/?key=VZNB7QCW8AXR5TMH3UKK6ELY4`);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (err) {
    return err;
  }
}