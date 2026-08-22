import { useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard.jsx";
import { getAllEvents } from "../utils/storage.js";
import { useToast } from "../context/ToastContext.jsx";

export default function Home() {
  const featured = getAllEvents().slice(0, 3);
  const [fbName, setFbName] = useState("");
  const [fbMsg, setFbMsg] = useState("");
  const showToast = useToast();

  function handleFeedbackSubmit(e) {
    e.preventDefault();
    showToast("Thanks for the feedback!");
    setFbName("");
    setFbMsg("");
  }

  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1 style={{ letterSpacing: "-0.5px" }}>
            All your campus events,
            <br />
            <span className="accent-text">one place.</span>
          </h1>
          <p>
            Technical fests, cultural nights, sports meets and workshops — stop checking five
            different Instagram pages. Browse, register and track everything from here.
          </p>
          <Link to="/events" className="btn">Browse Events</Link>
          <a href="#featured" className="btn secondary">See what's on</a>

          <div className="stats">
            <div className="stat"><b>6</b><span>Live events</span></div>
            <div className="stat"><b>5</b><span>Departments</span></div>
            <div className="stat"><b>1</b><span>Place to check</span></div>
          </div>
        </div>
      </section>

      <div className="announce-strip">
        <div className="container">
          <p>Venue for CodeSprint Hackathon shifted to CS Block Auditorium. Football Cup registration closes 2 days early.</p>
        </div>
      </div>

      <section className="section" id="featured">
        <div className="container">
          <div className="section-head">
            <h2>Featured this week</h2>
            <p><Link to="/events">View all &rarr;</Link></p>
          </div>
          <div className="event-grid">
            {featured.map((ev) => (
              <EventCard key={ev.id} ev={ev} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container">
          <div className="section-head">
            <h2>Have feedback?</h2>
          </div>
          <form onSubmit={handleFeedbackSubmit} style={{ maxWidth: "480px" }}>
            <label htmlFor="fb-name">Name</label>
            <input
              type="text"
              id="fb-name"
              placeholder="Your name"
              value={fbName}
              onChange={(e) => setFbName(e.target.value)}
            />
            <label htmlFor="fb-msg">Message</label>
            <input
              type="text"
              id="fb-msg"
              placeholder="Tell us what to improve"
              value={fbMsg}
              onChange={(e) => setFbMsg(e.target.value)}
            />
            <button className="btn" style={{ marginTop: "18px" }} type="submit">Send</button>
          </form>
        </div>
      </section>
    </main>
  );
}
