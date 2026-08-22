import { Link } from "react-router-dom";
import { formatDate, getCategoryTag } from "../utils/storage.js";

export default function EventCard({ ev }) {
  return (
    <div className="card" data-id={ev.id}>
      <div className="card-img">
        {ev.image ? (
          <img src={ev.image} alt={ev.title} />
        ) : (
          <span>{getCategoryTag(ev.category)}</span>
        )}
      </div>
      <div className="card-body">
        <span className="tag">{getCategoryTag(ev.category)}</span>
        <h3>{ev.title}</h3>
        <p className="meta">Date: {formatDate(ev.date)}</p>
        <p className="meta">Venue: {ev.venue}</p>
        <div className="card-foot">
          <span className="seats">{ev.seats} seats left</span>
          <Link className="link-btn" to={`/events/${ev.id}`}>
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}
