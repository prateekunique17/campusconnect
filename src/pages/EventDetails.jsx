import { Link } from "react-router-dom";
import {
  findEventById,
  formatDate,
  getCategoryTag,
  readFromLocalStorage,
  saveToLocalStorage,
} from "../utils/storage.js";
import { showToast } from "../context/ToastContext.jsx";

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
  const pathParts = window.location.pathname.split("/");
  const id = pathParts[pathParts.length - 1];
  const event = findEventById(id);

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

  const activeUser = readFromLocalStorage("activeUser", null);
  const registrations = readFromLocalStorage("registrations", []);
  const alreadyRegistered = registrations.some(function (item) {
    return item.eventId === event.id && item.email === activeUser.email;
  });
  const countdown = getCountdown(event.date);

  function handleRegistration(formEvent) {
    formEvent.preventDefault();

    const form = formEvent.target;
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
      !registration.email ||
      !registration.phone
    ) {
      showToast("Please fill every field before submitting.", true);
      return;
    }

    const savedRegistrations = readFromLocalStorage("registrations", []);
    const duplicateRegistration = savedRegistrations.some(function (item) {
      return item.eventId === event.id && item.email === registration.email;
    });

    if (duplicateRegistration) {
      showToast("You've already registered with this email.", true);
      return;
    }

    savedRegistrations.push(registration);
    saveToLocalStorage("registrations", savedRegistrations);
    form.reset();
    form.style.display = "none";
    document.querySelector(".registered-message").style.display = "block";
    showToast("Registered successfully!");
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
              <p
                className="registered-message"
                style={{ display: alreadyRegistered ? "block" : "none" }}
              >
                You are already registered for this event.
              </p>
              <form
                onSubmit={handleRegistration}
                style={{ display: alreadyRegistered ? "none" : "block" }}
              >
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" required />
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
