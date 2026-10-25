import { useState, useEffect, useRef, useMemo } from "react";
import {
  formatDate,
  readFromLocalStorage,
  saveToLocalStorage,
} from "../content/storage.js";

export default function Registrations() {
  // ----------------------------------------------------
  // 1. useState: Current active tab and data lists
  // ----------------------------------------------------
  const [activeTab, setActiveTab] = useState("registrations");
  const [registrations, setRegistrations] = useState(() =>
    readFromLocalStorage("registrations", [])
  );
  const [savedEvents, setSavedEvents] = useState(() =>
    readFromLocalStorage("saved", [])
  );

  // ----------------------------------------------------
  // 2. useEffect: Keep browser window scrolled to top when switching tabs
  // ----------------------------------------------------
  useEffect(() => {
    if (tabContainerRef.current) {
      tabContainerRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeTab]);

  // ----------------------------------------------------
  // 3. useRef: Reference to the tab container element
  // ----------------------------------------------------
  const tabContainerRef = useRef(null);

  // ----------------------------------------------------
  // 4. useMemo: Quick checks for list count
  // ----------------------------------------------------
  const counts = useMemo(
    () => ({
      regCount: registrations.length,
      savedCount: savedEvents.length,
    }),
    [registrations, savedEvents]
  );

  function handleCancelRegistration(index) {
    const updated = [...registrations];
    updated.splice(index, 1);
    saveToLocalStorage("registrations", updated);
    setRegistrations(updated);
  }

  function handleRemoveSaved(index) {
    const updated = [...savedEvents];
    updated.splice(index, 1);
    saveToLocalStorage("saved", updated);
    setSavedEvents(updated);
  }

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>My Dashboard</h2>
            <p>Everything stored locally in your browser</p>
          </div>

          <div className="reg-tabs" ref={tabContainerRef}>
            <button
              className={`registrations-tab ${activeTab === "registrations" ? "active" : ""}`}
              onClick={() => setActiveTab("registrations")}
            >
              My Registrations ({counts.regCount})
            </button>
            <button
              className={`saved-tab ${activeTab === "saved" ? "active" : ""}`}
              onClick={() => setActiveTab("saved")}
            >
              Saved Events ({counts.savedCount})
            </button>
          </div>

          {activeTab === "registrations" ? (
            <div className="reg-list registrations-list">
              {registrations.length === 0 ? (
                <p className="empty-state">No registrations yet.</p>
              ) : (
                registrations.map((registration, index) => (
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
                      onClick={() => handleCancelRegistration(index)}
                    >
                      Cancel
                    </button>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="reg-list saved-list">
              {savedEvents.length === 0 ? (
                <p className="empty-state">No saved events yet.</p>
              ) : (
                savedEvents.map((savedEvent, index) => (
                  <div className="reg-row" key={`${savedEvent.title}-${index}`}>
                    <div>
                      <strong>{savedEvent.title}</strong>
                      <p className="meta">{formatDate(savedEvent.date)}</p>
                    </div>
                    <button
                      className="cancel-btn"
                      onClick={() => handleRemoveSaved(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
