import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { readFromLocalStorage, saveToLocalStorage } from "../utils/storage.js";
import { useToast } from "../context/ToastContext.jsx";

export default function AddEvent() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Technical");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const showToast = useToast();

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) {
      setImagePreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result); // callback: runs once the file has been read
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !date || !venue.trim()) {
      showToast("Please fill title, date and venue.", true);
      return;
    }

    const newEvent = {
      id: Date.now(),
      title: title.trim(),
      category,
      date,
      venue: venue.trim(),
      organizer: "Student Submission",
      seats: 50,
      image: imagePreview,
    };

    const customEvents = readFromLocalStorage("customEvents", []);
    customEvents.push(newEvent);
    saveToLocalStorage("customEvents", customEvents);

    showToast("Event added!");
    navigate("/events");
  }

  return (
    <main>
      <section className="section">
        <div className="container" style={{ maxWidth: "640px" }}>
          <div className="section-head">
            <h2>Add a New Event</h2>
            <p>It will show up in the Events directory right after you submit</p>
          </div>

          <div className="add-event-block">
            <form onSubmit={handleSubmit}>
              <div className="add-event-grid">
                <div>
                  <label htmlFor="title">Event Title</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="category">Category</label>
                  <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Technical">Technical</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Sports">Sports</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Hackathon">Hackathon</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="venue">Venue</label>
                  <input
                    type="text"
                    id="venue"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    required
                  />
                </div>
              </div>

              <label htmlFor="event-image" style={{ marginTop: "14px" }}>Event Poster (image)</label>
              <input type="file" id="event-image" accept="image/*" onChange={handleImageChange} />
              <div className="image-preview">
                {imagePreview && <img src={imagePreview} alt="Preview" />}
              </div>

              <button className="btn" type="submit" style={{ marginTop: "16px" }}>Add Event</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
