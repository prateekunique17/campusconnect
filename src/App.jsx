import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { readFromLocalStorage, saveToLocalStorage } from "./utils/storage.js";

import Home from "./pages/Home.jsx";
import Events from "./pages/Events.jsx";
import AddEvent from "./pages/AddEvent.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import Registrations from "./pages/Registrations.jsx";

export default function App() {
  // Theme lives here (not in Navbar) because it has to affect the whole
  // document body, the same way body.classList.toggle("light-mode") did.
  const [theme, setTheme] = useState(() => readFromLocalStorage("theme", "dark"));

  useEffect(() => {
    document.body.classList.toggle("light-mode", theme === "light");
    saveToLocalStorage("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  return (
    <ToastProvider>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/registrations" element={<Registrations />} />
      </Routes>

    
    </ToastProvider>
  );
}
