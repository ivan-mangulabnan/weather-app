export class DomEle {

  static #cache = {};

  static get locationInput () {
    return this.#cache.locationInput ??= document.querySelector('#search');
  }

  static get searchBtn () {
    return this.#cache.searchBtn ??= document.querySelector(`#searchBtn`);
  }

  static get contentDiv () {
    return this.#cache.contentDiv ??= document.querySelector(`#content`);
  }
}