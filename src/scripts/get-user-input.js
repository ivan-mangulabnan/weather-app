import { DomEle } from "./dom.js";

export class UserInput {
  static get location () {
    return DomEle.locationInput.value;
  }
}