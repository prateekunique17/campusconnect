import { Link } from "react-router-dom";
import EventCard from "../components/EventCard.jsx";
import {
  getAllEvents,
  readFromLocalStorage,
  saveToLocalStorage,
} from "../utils/storage.js";

const categories = [
  "Technical",
  "Cultural",
  "Sports",
  "Workshop",
  "Seminar",
  "Hackathon",
];

export default function Events() {
  const events = getAllEvents();
  const customEvents = readFromLocalStorage("customEvents", []);

  function deleteEvent(eventId) {
    const answer = window.confirm("Do you want to delete this event?");
    if (!answer) {
      return;
    }

    const remainingEvents = customEvents.filter(function (event) {
      return event.id !== eventId;
    });
    saveToLocalStorage("customEvents", remainingEvents);
    window.location.reload();
  }

  function filterEvents() {
    const searchInput = document.querySelector("#event-search");
    const categoryInput = document.querySelector("#event-category");
    const cards = document.querySelectorAll(".card");
    const searchText = searchInput.value.trim().toLowerCase();

    cards.forEach(function (card) {
      const eventId = Number(card.getAttribute("data-id"));
      const event = events.find(function (item) {
        return item.id === eventId;
      });
      const hasSearchText =
        event.title.toLowerCase().includes(searchText) ||
        event.organizer.toLowerCase().includes(searchText);
      const hasCategory =
        categoryInput.value === "all" || event.category === categoryInput.value;
      card.style.display = hasSearchText && hasCategory ? "block" : "none";
    });
  }

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>All Events</h2>
            <p>
              <Link to="/add-event">+ Add a new event</Link>
            </p>
          </div>

          <div className="filter-bar">
            <input
              id="event-search"
              type="text"
              placeholder="Search by event name or organizer..."
              onInput={filterEvents}
            />
            <select id="event-category" onChange={filterEvents}>
              <option value="all">All categories</option>
              {categories.map(function (category) {
                return (
                  <option value={category} key={category}>
                    {category}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="event-grid">
            {events.map(function (event) {
              const isCustomEvent = customEvents.some(function (customEvent) {
                return customEvent.id === event.id;
              });

              return (
                <EventCard
                  key={event.id}
                  ev={event}
                  onDelete={isCustomEvent ? deleteEvent : null}
                />
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
