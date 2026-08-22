import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  findEventById,
  formatDate,
  getCategoryTag,
  readFromLocalStorage,
  saveToLocalStorage,
} from "../utils/storage.js";
import { useToast } from "../context/ToastContext.jsx";

function getEmptyForm() {
  return {
    name: "",
    roll: "",
    dept: "",
    year: "",
    email: "",
    phone: "",
  };
}

function getCountdownParts(dateStr) {
  const target = new Date(dateStr).getTime();
  const diff = Math.max(0, target - Date.now());

  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
  };
}

function useCountdown(dateStr) {
  const [remaining, setRemaining] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  useEffect(() => {
    const tick = () => setRemaining(getCountdownParts(dateStr));

    tick();
    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, [dateStr]);

  return remaining;
}

export default function EventDetails() {
  const { id } = useParams();
  const event = findEventById(id);
  const countdown = useCountdown(event?.date ?? new Date().toISOString());
  const [form, setForm] = useState(getEmptyForm);
  const [error, setError] = useState("");
  const showToast = useToast();

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

  function handleChange(field) {
    return (eventInfo) => {
      const value = eventInfo.target.value;
      setForm((current) => ({ ...current, [field]: value }));
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const data = {
      ...form,
      name: form.name.trim(),
      roll: form.roll.trim(),
      dept: form.dept.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
    };

    if (Object.values(data).some((value) => !value)) {
      setError("Please fill every field before submitting.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      setError("Enter a valid email address.");
      return;
    }

    const registrations = readFromLocalStorage("registrations", []);
    const isDuplicate = registrations.some(
      (entry) => entry.eventId === event.id && entry.email === data.email,
    );

    if (isDuplicate) {
      showToast("You've already registered with this email.", true);
      return;
    }

    registrations.push({
      eventId: event.id,
      title: event.title,
      ...data,
      date: event.date,
    });

    saveToLocalStorage("registrations", registrations);
    showToast("Registered successfully!");
    setForm(getEmptyForm());
  }

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
                    <b>{String(countdown.mins).padStart(2, "0")}</b>
                    <span>MIN</span>
                  </div>
                  <div>
                    <b>{String(countdown.secs).padStart(2, "0")}</b>
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

            <div>
              <div className="detail-block">
                <h3>Register</h3>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={form.name}
                    onChange={handleChange("name")}
                    required
                  />

                  <label htmlFor="roll">Roll Number</label>
                  <input
                    type="text"
                    id="roll"
                    value={form.roll}
                    onChange={handleChange("roll")}
                    required
                  />

                  <label htmlFor="dept">Department</label>
                  <input
                    type="text"
                    id="dept"
                    value={form.dept}
                    onChange={handleChange("dept")}
                    required
                  />

                  <label htmlFor="year">Year</label>
                  <input
                    type="text"
                    id="year"
                    placeholder="e.g. 2nd Year"
                    value={form.year}
                    onChange={handleChange("year")}
                    required
                  />

                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    required
                  />

                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    required
                  />

                  <p className="form-error">{error}</p>
                  <button
                    className="btn"
                    style={{ marginTop: "16px", width: "100%" }}
                    type="submit"
                  >
                    Confirm Registration
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
