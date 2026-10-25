import { Link } from "react-router-dom";
import { formatDate, getCategoryTag } from "../content/storage.js";

// Reusable card component to show summary information for an event
export default function EventCard({ ev, onDelete }) {
  const category = getCategoryTag(ev.category);

  return (
    <div className="card" data-id={ev.id}>
      <div className="card-img">
        {ev.image ? (
          <img src={ev.image} alt={ev.title} />
        ) : (
          <span>{category}</span>
        )}
      </div>
      <div className="card-body">
        <span className="tag">{category}</span>
        <h3>{ev.title}</h3>
        <p className="meta">Date: {formatDate(ev.date)}</p>
        <p className="meta">Venue: {ev.venue}</p>
        <div className="card-foot">
          <span className="seats">{ev.seats} seats left</span>
          <Link className="link-btn" to={`/events/${ev.id}`}>
            View details
          </Link>
          {onDelete && (
            <button className="delete-btn" onClick={() => onDelete(ev.id)}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
