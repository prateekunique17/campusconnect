import { useState, useEffect } from "react";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { ToastProvider } from "./content/ToastContent.jsx";
import { readFromLocalStorage, saveToLocalStorage } from "./content/storage.js";
import Home from "./pages/Home.jsx";
import Events from "./pages/Events.jsx";
import AddEvent from "./pages/AddEvent.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import Registrations from "./pages/Registrations.jsx";
import Auth from "./pages/Auth.jsx";

export default function App() {
  const navigate = useNavigate();

  // ----------------------------------------------------
  // 1. useState: Reactive application state for theme & activeUser
  // ----------------------------------------------------
  const [theme, setTheme] = useState(() => readFromLocalStorage("theme", "dark"));
  const [activeUser, setActiveUser] = useState(() => readFromLocalStorage("activeUser", null));

  // ----------------------------------------------------
  // 2. useEffect: Sync theme class on document.body smoothly without page reload
  // ----------------------------------------------------
  useEffect(() => {
    document.body.classList.toggle("light-mode", theme === "light");
  }, [theme]);

  // Toggle theme between dark and light smoothly
  function handleToggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    saveToLocalStorage("theme", nextTheme);
  }

  // Log out user cleanly
  function handleLogout() {
    window.localStorage.removeItem("activeUser");
    setActiveUser(null);
    navigate("/");
  }

  // Route protection helper
  function protect(page) {
    if (!activeUser) {
      return <Navigate to="/login" replace />;
    }
    return page;
  }

  return (
    <ToastProvider>
      <Navbar
        theme={theme}
        activeUser={activeUser}
        onToggleTheme={handleToggleTheme}
        onLogout={handleLogout}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={protect(<Events />)} />
        <Route path="/add-event" element={protect(<AddEvent />)} />
        <Route path="/events/:id" element={protect(<EventDetails />)} />
        <Route path="/registrations" element={protect(<Registrations />)} />
        <Route
          path="/login"
          element={
            activeUser ? (
              <Navigate to="/" replace />
            ) : (
              <Auth onLoginSuccess={(user) => setActiveUser(user)} />
            )
          }
        />
      </Routes>
      <Footer />
    </ToastProvider>
  );
}
