import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard.jsx";
import { getAllEvents } from "../utils/storage.js";

export default function Events() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");

  // re-reads localStorage each render so a newly-added event shows up
  const allEvents = getAllEvents();

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    return allEvents.filter((ev) => {
      const matchesKeyword =
        ev.title.toLowerCase().includes(kw) || ev.organizer.toLowerCase().includes(kw);
      const matchesCategory = category === "all" || ev.category === category;
      return matchesKeyword && matchesCategory;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, category, allEvents.length]);

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>All Events</h2>
            <p><Link to="/add-event">+ Add a new event</Link></p>
          </div>

          <div className="filter-bar">
            <input
              type="text"
              placeholder="Search by event name or organizer..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">All categories</option>
              <option value="Technical">Technical</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Hackathon">Hackathon</option>
            </select>
          </div>

          <div className="event-grid">
            {filtered.length ? (
              filtered.map((ev) => <EventCard key={ev.id} ev={ev} />)
            ) : (
              <p className="empty-state">No events match your search.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
