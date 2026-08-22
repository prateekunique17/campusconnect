import { useState } from "react";
import { formatDate, readFromLocalStorage, saveToLocalStorage } from "../utils/storage.js";

export default function Registrations() {
  const [tab, setTab] = useState("registrations");
  const [regs, setRegs] = useState(() => readFromLocalStorage("registrations", []));
  const [saved, setSaved] = useState(() => readFromLocalStorage("saved", []));

  function cancelRegistration(index) {
    const next = regs.filter((_, i) => i !== index);
    setRegs(next);
    saveToLocalStorage("registrations", next);
  }

  function removeSaved(index) {
    const next = saved.filter((_, i) => i !== index);
    setSaved(next);
    saveToLocalStorage("saved", next);
  }

  const list = tab === "registrations" ? regs : saved;

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
              className={tab === "registrations" ? "active" : ""}
              onClick={() => setTab("registrations")}
            >
              My Registrations
            </button>
            <button className={tab === "saved" ? "active" : ""} onClick={() => setTab("saved")}>
              Saved Events
            </button>
          </div>

          <div className="reg-list">
            {list.length === 0 && (
              <p className="empty-state">
                {tab === "registrations" ? "No registrations yet." : "No saved events yet."}
              </p>
            )}

            {tab === "registrations"
              ? regs.map((r, i) => (
                  <div className="reg-row" key={`${r.eventId}-${r.email}-${i}`}>
                    <div>
                      <strong>{r.title}</strong>
                      <p className="meta">{formatDate(r.date)} - {r.email}</p>
                    </div>
                    <button className="cancel-btn" onClick={() => cancelRegistration(i)}>Cancel</button>
                  </div>
                ))
              : saved.map((s, i) => (
                  <div className="reg-row" key={`${s.title}-${i}`}>
                    <div>
                      <strong>{s.title}</strong>
                      <p className="meta">{formatDate(s.date)}</p>
                    </div>
                    <button className="cancel-btn" onClick={() => removeSaved(i)}>Remove</button>
                  </div>
                ))}
          </div>
        </div>
      </section>
    </main>
  );
}
