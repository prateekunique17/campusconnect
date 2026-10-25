import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  findEventById,
  formatDate,
  getCategoryTag,
  readFromLocalStorage,
  saveToLocalStorage,
} from "../content/storage.js";
import { showToast } from "../content/ToastContent.jsx";

// Helper function to calculate remaining days, hours, minutes, and seconds
function getCountdown(date) {
  const eventTime = new Date(date).getTime();
  const currentTime = Date.now();
  const timeLeft = Math.max(0, eventTime - currentTime);

  return {
    days: Math.floor(timeLeft / 86400000),
    hours: Math.floor((timeLeft % 86400000) / 3600000),
    minutes: Math.floor((timeLeft % 3600000) / 60000),
    seconds: Math.floor((timeLeft % 60000) / 1000),
  };
}

export default function EventDetails() {
  const { id } = useParams();
  const event = findEventById(id);
  const activeUser = readFromLocalStorage("activeUser", { email: "" });

  // ----------------------------------------------------
  // 1. useState: Reactive state for live countdown & registration status
  // ----------------------------------------------------
  // Stores live countdown time values
  const [countdown, setCountdown] = useState(() =>
    event ? getCountdown(event.date) : { days: 0, hours: 0, minutes: 0, seconds: 0 }
  );
  // Stores registration submission status
  const [isRegistered, setIsRegistered] = useState(false);

  // ----------------------------------------------------
  // 2. useEffect: Sets up interval timer for countdown
  // ----------------------------------------------------
  useEffect(() => {
    if (!event) return;

    // Run every 1 second to decrement countdown
    const intervalId = setInterval(() => {
      setCountdown(getCountdown(event.date));
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [event]);

  // ----------------------------------------------------
  // 3. useRef: References form input to focus or inspect directly
  // ----------------------------------------------------
  // Ref pointing to the student name input field
  const nameInputRef = useRef(null);

  // ----------------------------------------------------
  // 4. useMemo: Checks registration status without repeated array loops
  // ----------------------------------------------------
  // Check if current user is already in registrations list
  const alreadyRegistered = useMemo(() => {
    if (!event || !activeUser) return false;
    const registrations = readFromLocalStorage("registrations", []);
    return registrations.some(
      (item) => item.eventId === event.id && item.email === activeUser.email
    );
  }, [event, activeUser, isRegistered]);

  if (!event) {
    return (
      <main>
        <section className="section">
          <div className="container">
            <p className="empty-state">Event not found.</p>
            <Link className="back-link" to="/events">
              &larr; Back to all events
            </Link>
          </div>
        </section>
      </main>
    );
  }

  function handleRegistration(e) {
    e.preventDefault();
    const form = e.target;
    const registration = {
      name: form.name.value.trim(),
      roll: form.roll.value.trim(),
      dept: form.dept.value.trim(),
      year: form.year.value.trim(),
      email: activeUser.email,
      phone: form.phone.value.trim(),
      eventId: event.id,
      title: event.title,
      date: event.date,
    };

    if (
      !registration.name ||
      !registration.roll ||
      !registration.dept ||
      !registration.year ||
      !registration.phone
    ) {
      showToast("Please fill every field before submitting.", true);
      return;
    }

    const savedRegistrations = readFromLocalStorage("registrations", []);
    savedRegistrations.push(registration);
    saveToLocalStorage("registrations", savedRegistrations);

    setIsRegistered(true);
    showToast("Registered successfully!");
  }

  const showRegistrationForm = !alreadyRegistered && !isRegistered;

  return (
    <main>
      <section className="section">
        <div className="container">
          <Link className="back-link" to="/events">
            &larr; Back to all events
          </Link>
          <span className="tag">{getCategoryTag(event.category)}</span>
          <h1 id="detail-title">{event.title}</h1>

          <div className="details-grid">
            <div>
              <div className="detail-image">
                {event.image ? (
                  <img src={event.image} alt={event.title} />
                ) : (
                  <span>{getCategoryTag(event.category)}</span>
                )}
              </div>
              <div className="detail-block">
                <h3>Countdown</h3>
                <div className="countdown">
                  <div>
                    <b>{countdown.days}</b>
                    <span>DAYS</span>
                  </div>
                  <div>
                    <b>{String(countdown.hours).padStart(2, "0")}</b>
                    <span>HRS</span>
                  </div>
                  <div>
                    <b>{String(countdown.minutes).padStart(2, "0")}</b>
                    <span>MIN</span>
                  </div>
                  <div>
                    <b>{String(countdown.seconds).padStart(2, "0")}</b>
                    <span>SEC</span>
                  </div>
                </div>
              </div>
              <div className="detail-block">
                <h3>Details</h3>
                <p className="meta">Venue: {event.venue}</p>
                <p className="meta">Date: {formatDate(event.date)}</p>
                <p className="meta">Organized by: {event.organizer}</p>
                <p className="meta">Seats remaining: {event.seats}</p>
                <p className="meta">
                  Eligibility: Open to all currently enrolled students.
                </p>
              </div>
            </div>

            <div className="detail-block">
              <h3>Register</h3>
              {!showRegistrationForm ? (
                <p className="registered-message" style={{ display: "block" }}>
                  You are registered for this event.
                </p>
              ) : (
                <form onSubmit={handleRegistration}>
                  <label htmlFor="name">Full Name</label>
                  <input ref={nameInputRef} type="text" id="name" name="name" required />
                  <label htmlFor="roll">Roll Number</label>
                  <input type="text" id="roll" name="roll" required />
                  <label htmlFor="dept">Department</label>
                  <input type="text" id="dept" name="dept" required />
                  <label htmlFor="year">Year</label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    placeholder="e.g. 2nd Year"
                    required
                  />
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={activeUser.email}
                    readOnly
                    required
                  />
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" required />
                  <button
                    className="btn"
                    style={{ marginTop: "16px", width: "100%" }}
                    type="submit"
                  >
                    Confirm Registration
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
