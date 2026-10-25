import { NavLink } from "react-router-dom";

export default function Navbar({ theme, activeUser, onToggleTheme, onLogout }) {
  return (
    <header className="navbar">
      <div className="container">
        <div className="brand">
          Campus<span>Connect</span>
        </div>
        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/add-event">Add Event</NavLink>
          <NavLink to="/registrations">My Registrations</NavLink>
        </nav>
        <div className="nav-actions">
          <button
            id="theme-toggle"
            className="theme-toggle"
            onClick={onToggleTheme}
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
          {activeUser ? (
            <button className="nav-login" onClick={onLogout}>
              Log out
            </button>
          ) : (
            <NavLink to="/login" className="nav-login">
              Sign in
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
