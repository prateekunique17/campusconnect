import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard.jsx";
import {
  getAllEvents,
  readFromLocalStorage,
  saveToLocalStorage,
} from "../content/storage.js";

const categories = [
  "Technical",
  "Cultural",
  "Sports",
  "Workshop",
  "Seminar",
  "Hackathon",
];

export default function Events() {
  // ----------------------------------------------------
  // 1. useState: Stores reactive data that changes the UI
  // ----------------------------------------------------
  // Stores the list of custom events saved by the user in localStorage
  const [customEvents, setCustomEvents] = useState(() =>
    readFromLocalStorage("customEvents", [])
  );
  // Stores the search query entered in the search box
  const [searchTerm, setSearchTerm] = useState("");
  // Stores the currently selected category dropdown filter
  const [selectedCategory, setSelectedCategory] = useState("all");

  // ----------------------------------------------------
  // 2. useEffect: Handles side-effects (e.g., auto-focusing on mount)
  // ----------------------------------------------------
  useEffect(() => {
    // When the user opens the events page, automatically focus the search bar
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  // ----------------------------------------------------
  // 3. useRef: References a specific DOM element directly
  // ----------------------------------------------------
  // Attached to the search input element to control focus cleanly
  const searchRef = useRef(null);

  // ----------------------------------------------------
  // 4. useMemo: Computes and memorizes filtered results efficiently
  // ----------------------------------------------------
  // Recalculates the event list only when customEvents, searchTerm, or selectedCategory changes
  const filteredEvents = useMemo(() => {
    const all = getAllEvents();
    const query = searchTerm.trim().toLowerCase();

    return all.filter((ev) => {
      const matchesSearch =
        ev.title.toLowerCase().includes(query) ||
        (ev.organizer && ev.organizer.toLowerCase().includes(query));
      const matchesCategory =
        selectedCategory === "all" || ev.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [customEvents, searchTerm, selectedCategory]);

  // Handler to delete a user-created event cleanly using React state
  function handleDeleteEvent(eventId) {
    const confirmed = window.confirm("Do you want to delete this event?");
    if (!confirmed) return;

    const remaining = customEvents.filter((ev) => ev.id !== eventId);
    saveToLocalStorage("customEvents", remaining);
    setCustomEvents(remaining);
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
            {/* Using searchRef on input and updating searchTerm on change */}
            <input
              ref={searchRef}
              id="event-search"
              type="text"
              placeholder="Search by event name or organizer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Controlled dropdown for category */}
            <select
              id="event-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="event-grid">
            {filteredEvents.length === 0 ? (
              <p className="empty-state">No events match your criteria.</p>
            ) : (
              filteredEvents.map((event) => {
                const isCustomEvent = customEvents.some(
                  (custom) => custom.id === event.id
                );

                return (
                  <EventCard
                    key={event.id}
                    ev={event}
                    onDelete={isCustomEvent ? handleDeleteEvent : null}
                  />
                );
              })
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
