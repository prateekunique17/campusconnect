import { readFromLocalStorage, saveToLocalStorage } from "../utils/storage.js";
import { showToast } from "../context/ToastContext.jsx";

export default function AddEvent() {
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) {
      document.querySelector(".image-preview").innerHTML = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = function () {
      document.querySelector(".image-preview").innerHTML =
        `<img src="${reader.result}" alt="Preview" />`;
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const title = event.target.title.value.trim();
    const category = event.target.category.value;
    const date = event.target.date.value;
    const venue = event.target.venue.value.trim();
    const organizer = event.target.organizer.value.trim();
    const image = document.querySelector(".image-preview img");

    if (!title || !date || !venue || !organizer) {
      showToast("Please fill title, date, venue and organizer.", true);
      return;
    }

    const customEvents = readFromLocalStorage("customEvents", []);
    customEvents.push({
      id: Date.now(),
      title: title,
      category: category,
      date: date,
      venue: venue,
      organizer: organizer,
      seats: 50,
      image: image ? image.src : null,
    });
    saveToLocalStorage("customEvents", customEvents);

    showToast("Event added!");
    window.location.href = "/events";
  }

  return (
    <main>
      <section className="section">
        <div className="container" style={{ maxWidth: "640px" }}>
          <div className="section-head">
            <h2>Add a New Event</h2>
            <p>
              It will show up in the Events directory right after you submit
            </p>
          </div>

          <div className="add-event-block">
            <form onSubmit={handleSubmit}>
              <div className="add-event-grid">
                <div>
                  <label htmlFor="title">Event Title</label>
                  <input type="text" id="title" name="title" required />
                </div>
                <div>
                  <label htmlFor="category">Category</label>
                  <select id="category" name="category">
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
              <div className="image-preview"></div>

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
