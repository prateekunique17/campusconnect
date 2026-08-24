import { Navigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { readFromLocalStorage, saveToLocalStorage } from "./utils/storage.js";
import Home from "./pages/Home.jsx";
import Events from "./pages/Events.jsx";
import AddEvent from "./pages/AddEvent.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import Registrations from "./pages/Registrations.jsx";
import Auth from "./pages/Auth.jsx";

export default function App() {
  const theme = readFromLocalStorage("theme", "dark");
  const activeUser = readFromLocalStorage("activeUser", null);
  document.body.classList.toggle("light-mode", theme === "light");

  function protect(page) {
    if (!activeUser) {
      return <Navigate to="/login" replace />;
    }
    return page;
  }

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    saveToLocalStorage("theme", newTheme);
    window.location.reload();
  }

  function logout() {
    window.localStorage.removeItem("activeUser");
    window.location.href = "/";
  }

  return (
    <ToastProvider>
      {activeUser && (
        <Navbar
          theme={theme}
          activeUser={activeUser}
          onToggleTheme={toggleTheme}
          onLogout={logout}
        />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={protect(<Events />)} />
        <Route path="/add-event" element={protect(<AddEvent />)} />
        <Route path="/events/:id" element={protect(<EventDetails />)} />
        <Route path="/registrations" element={protect(<Registrations />)} />
        <Route
          path="/login"
          element={activeUser ? <Navigate to="/" replace /> : <Auth />}
        />
      </Routes>
    </ToastProvider>
  );
}
