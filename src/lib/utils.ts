import { dev } from "$app/environment";

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getDay() {
  let day;
  if (dev) {
    day = new Date().getDay();
  } else {
    day = new Date();
    day.setHours(day.getHours() - 7);
  }
  return day;
}