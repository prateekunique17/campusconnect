import { NavLink } from "react-router-dom";

export default function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="navbar">
      <div className="container">
        <div className="brand">
          Campus<span>Connect</span>
        </div>
        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/add-event">Add Event</NavLink>
          <NavLink to="/registrations">My Registrations</NavLink>
        </nav>
        <button id="theme-toggle" className="theme-toggle" onClick={onToggleTheme}>
          {theme === "light" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </header>
  );
}
