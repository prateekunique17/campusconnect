import {
  formatDate,
  readFromLocalStorage,
  saveToLocalStorage,
} from "../utils/storage.js";

function removeRegistration(index) {
  const registrations = readFromLocalStorage("registrations", []);
  registrations.splice(index, 1);
  saveToLocalStorage("registrations", registrations);
  window.location.reload();
}

function removeSavedEvent(index) {
  const savedEvents = readFromLocalStorage("saved", []);
  savedEvents.splice(index, 1);
  saveToLocalStorage("saved", savedEvents);
  window.location.reload();
}

function showTab(tabName) {
  const showRegistrations = tabName === "registrations";
  const registrationsTab = document.querySelector(".registrations-tab");
  const savedTab = document.querySelector(".saved-tab");
  const registrationsList = document.querySelector(".registrations-list");
  const savedList = document.querySelector(".saved-list");

  registrationsTab.classList.toggle("active", showRegistrations);
  savedTab.classList.toggle("active", !showRegistrations);
  registrationsList.style.display = showRegistrations ? "grid" : "none";
  savedList.style.display = showRegistrations ? "none" : "grid";
}

export default function Registrations() {
  const registrations = readFromLocalStorage("registrations", []);
  const savedEvents = readFromLocalStorage("saved", []);

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>My Dashboard</h2>
            <p>Everything stored locally in your browser</p>
          </div>

          <div className="reg-tabs">
            <button
              className="registrations-tab active"
              onClick={() => showTab("registrations")}
            >
              My Registrations
            </button>
            <button className="saved-tab" onClick={() => showTab("saved")}>
              Saved Events
            </button>
          </div>

          <div className="reg-list registrations-list">
            {registrations.length === 0 && (
              <p className="empty-state">No registrations yet.</p>
            )}
            {registrations.map(function (registration, index) {
              return (
                <div
                  className="reg-row"
                  key={`${registration.eventId}-${registration.email}-${index}`}
                >
                  <div>
                    <strong>{registration.title}</strong>
                    <p className="meta">
                      {formatDate(registration.date)} - {registration.email}
                    </p>
                  </div>
                  <button
                    className="cancel-btn"
                    onClick={() => removeRegistration(index)}
                  >
                    Cancel
                  </button>
                </div>
              );
            })}
          </div>

          <div className="reg-list saved-list" style={{ display: "none" }}>
            {savedEvents.length === 0 && (
              <p className="empty-state">No saved events yet.</p>
            )}
            {savedEvents.map(function (savedEvent, index) {
              return (
                <div className="reg-row" key={`${savedEvent.title}-${index}`}>
                  <div>
                    <strong>{savedEvent.title}</strong>
                    <p className="meta">{formatDate(savedEvent.date)}</p>
                  </div>
                  <button
                    className="cancel-btn"
                    onClick={() => removeSavedEvent(index)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
