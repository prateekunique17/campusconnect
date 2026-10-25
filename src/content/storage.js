import { EVENTS } from "../data/events.js";

// Helper function to save any data to the browser's localStorage
export function saveToLocalStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

// Helper function to read data from localStorage (or return fallback if empty)
export function readFromLocalStorage(key, fallback) {
  const raw = window.localStorage.getItem(key);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }
  return fallback;
}

// Get all events combining the initial seed list with any user-added events
export function getAllEvents() {
  const customEvents = readFromLocalStorage("customEvents", []);
  return [...EVENTS, ...customEvents];
}

// Find a single event by its numeric ID
export function findEventById(id) {
  const numberId = Number(id);
  const events = getAllEvents();
  return events.find((event) => event.id === numberId);
}

// Format a date string into readable text (e.g., "5 Sep 2026")
export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Convert category string to uppercase tag
export function getCategoryTag(category) {
  return (category || "").toUpperCase();
}
