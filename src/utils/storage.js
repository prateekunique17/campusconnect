import { EVENTS } from "../data/events.js";

export function saveToLocalStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function readFromLocalStorage(key, fallback) {
  const raw = window.localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
}

export function getAllEvents() {
  const savedEvents = readFromLocalStorage("customEvents", []);
  return [...EVENTS, ...savedEvents];
}

export function findEventById(id) {
  return getAllEvents().find((event) => event.id === Number(id));
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getCategoryTag(category) {
  return category.toUpperCase();
}
