export class DomEle {

  static #cache = {};

  static get locationInput () {
    return this.#cache.locationInput ??= document.querySelector('#search');
  }

  static get searchBtn () {
    return this.#cache.searchBtn ??= document.querySelector(`#searchBtn`);
  }

  static get searchDiv () {
    return this.#cache.searchDiv ??= document.querySelector(`#searchDiv`);
  }

  static get contentDiv () {
    return this.#cache.contentDiv ??= document.querySelector(`#content`);
  }

  static get dateOne () {
    return this.#cache.dateOne ??= document.querySelector(`#dateOne`);
  }

  static get dateTwo () {
    return this.#cache.dateTwo ??= document.querySelector(`#dateTwo`);
  }
}