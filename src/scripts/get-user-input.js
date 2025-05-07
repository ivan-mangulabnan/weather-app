import { DomEle } from "./dom.js";
import { format, addYears, addDays, addMonths, isWithinInterval } from "date-fns";

export class UserInput {
  static get location () {
    return valueToFetch();
  }
}

export function isEmpty (value) {
  if (!value) return true;
  return false;
}

export function isWhiteSpace(value) {
  const pattern = /^[A-Za-z0-9]/;
  return !pattern.test(value);
}

export function setDateOneMinMax () {
  DomEle.dateOne.min = "2000-01-01";
  DomEle.dateOne.max = format(addYears(new Date(), 1), "yyyy-MM-dd");
}

export function setDateTwoMinMax () {
  DomEle.dateTwo.min = format(addDays(DomEle.dateOne.value, 1), "yyyy-MM-dd");
  DomEle.dateTwo.max = format(addMonths(DomEle.dateOne.value, 1), "yyyy-MM-dd");
}

function checkRangeValidity (dateElement, date) {
  const minRange = dateElement.min;
  const maxRange = dateElement.max;

  return isWithinInterval(date, {
    start: minRange,
    end: maxRange
  });
}

export function isDateValid (dateElement) {
  if (isEmpty(dateElement.value) || !checkRangeValidity(dateElement, dateElement.value)) return false;
  return true;
}

function valueToFetch () {
  let search = `${DomEle.locationInput.value}`;

  if (isDateValid(DomEle.dateOne)) {
    search += `/${DomEle.dateOne.value}`;
  }

  if (isDateValid(DomEle.dateTwo)) {
    search += `/${DomEle.dateTwo.value}`;
  }
  
  return search;
}