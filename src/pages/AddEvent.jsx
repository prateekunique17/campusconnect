import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { readFromLocalStorage, saveToLocalStorage } from "../content/storage.js";
import { showToast } from "../content/ToastContent.jsx";

const CATEGORIES = [
  "Technical",
  "Cultural",
  "Sports",
  "Workshop",
  "Seminar",
  "Hackathon",
];

export default function AddEvent() {
  const navigate = useNavigate();

  // ----------------------------------------------------
  // 1. useState: Stores preview image and submitting status
  // ----------------------------------------------------
  const [imagePreview, setImagePreview] = useState(null);
  const [category, setCategory] = useState("Technical");

  // ----------------------------------------------------
  // 2. useEffect: Focus title input upon loading page
  // ----------------------------------------------------
  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  // ----------------------------------------------------
  // 3. useRef: Reference to the title input for auto-focus
  // ----------------------------------------------------
  const titleInputRef = useRef(null);

  // ----------------------------------------------------
  // 4. useMemo: Valid category options list
  // ----------------------------------------------------
  const categoryOptions = useMemo(() => CATEGORIES, []);

  // Handle image upload and generate preview data URL
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) {
      setImagePreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value.trim();
    const date = form.date.value;
    const venue = form.venue.value.trim();
    const organizer = form.organizer.value.trim();

    if (!title || !date || !venue || !organizer) {
      showToast("Please fill title, date, venue and organizer.", true);
      return;
    }

    const customEvents = readFromLocalStorage("customEvents", []);
    customEvents.push({
      id: Date.now(),
      title,
      category,
      date,
      venue,
      organizer,
      seats: 50,
      image: imagePreview,
    });

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
                    ref={titleInputRef}
                    type="text"
                    id="title"
                    name="title"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categoryOptions.map((cat) => (
                      <option value={cat} key={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="date">Date</label>
                  <input type="date" id="date" name="date" required />
                </div>
                <div>
                  <label htmlFor="venue">Venue</label>
                  <input type="text" id="venue" name="venue" required />
                </div>
                <div>
                  <label htmlFor="organizer">Organizer</label>
                  <input type="text" id="organizer" name="organizer" required />
                </div>
              </div>

              <label htmlFor="event-image" style={{ marginTop: "14px" }}>
                Event Poster (image)
              </label>
              <input
                type="file"
                id="event-image"
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className="image-preview">
                {imagePreview && <img src={imagePreview} alt="Preview" />}
              </div>

              <button
                className="btn"
                type="submit"
                style={{ marginTop: "16px" }}
              >
                Add Event
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
