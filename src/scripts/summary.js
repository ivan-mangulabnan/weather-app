import { DomEle } from "./dom.js";

export function showSummary (weatherJSON) {
  const outerDiv = document.createElement('div');
  outerDiv.classList.add('summary-div');

  const address = summarySection('ADDRESS', weatherJSON.resolvedAddress);
  const timezone = summarySection('TIMEZONE', weatherJSON.timezone);
  const totalDays = summarySection('NO OF DAYS', weatherJSON.days.length);
  const description = summarySection('SUMMARY', weatherJSON.description);

  outerDiv.append(address, timezone, totalDays, description);
  DomEle.contentDiv.appendChild(outerDiv);
}

function summarySection(label, value) {
  const p =  document.createElement('p');
  const span = document.createElement('span');

  p.textContent = `${label}:`;
  span.textContent = ` ${value}`;

  p.appendChild(span);
  return p;
}