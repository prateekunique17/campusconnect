import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { readFromLocalStorage, saveToLocalStorage } from "../content/storage.js";
import { showToast } from "../content/ToastContent.jsx";

export default function Auth({ onLoginSuccess }) {
  const navigate = useNavigate();

  // ----------------------------------------------------
  // 1. useState: Controls current tab ('login' or 'signup')
  // ----------------------------------------------------
  const [tab, setTab] = useState("login");

  // ----------------------------------------------------
  // 2. useEffect: Focuses input when tab changes
  // ----------------------------------------------------
  useEffect(() => {
    if (tab === "login" && emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [tab]);

  // ----------------------------------------------------
  // 3. useRef: References the login email input element
  // ----------------------------------------------------
  const emailInputRef = useRef(null);

  // ----------------------------------------------------
  // 4. useMemo: Computes tab status for cleaner JSX
  // ----------------------------------------------------
  const isLogin = useMemo(() => tab === "login", [tab]);

  function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value.trim().toLowerCase();
    const password = e.target.password.value;
    const users = readFromLocalStorage("users", []);
    const user = users.find(
      (item) => item.email === email && item.password === password
    );

    if (!user) {
      showToast("Email or password is not correct.", true);
      return;
    }

    const userData = { name: user.name, email: user.email };
    saveToLocalStorage("activeUser", userData);
    showToast("Welcome back!");

    if (onLoginSuccess) {
      onLoginSuccess(userData);
    }
    navigate("/");
  }

  function handleSignup(e) {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim().toLowerCase();
    const password = e.target.password.value;
    const users = readFromLocalStorage("users", []);

    if (!name || !email || password.length < 6) {
      showToast("Please complete all fields and use 6+ password characters.", true);
      return;
    }

    if (users.some((u) => u.email === email)) {
      showToast("This email already has an account.", true);
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    saveToLocalStorage("users", users);

    const userData = { name, email };
    saveToLocalStorage("activeUser", userData);
    showToast("Account created!");

    if (onLoginSuccess) {
      onLoginSuccess(userData);
    }
    navigate("/");
  }

  return (
    <main className="auth-page">
      <section className="auth-shell container">
        <div className="auth-intro">
          <p className="eyebrow">
            <span className="eyebrow-dot" /> Your campus, together
          </p>
          <h1>
            Good things happen when you{" "}
            <span className="accent-text">show up.</span>
          </h1>
          <p>Keep your events, registrations and campus plans close at hand.</p>
          <Link to="/" className="text-link">
            Back to landing page <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="auth-card">
          <div className="auth-tabs">
            <button
              className={`login-tab ${isLogin ? "active" : ""}`}
              type="button"
              onClick={() => setTab("login")}
            >
              Sign in
            </button>
            <button
              className={`signup-tab ${!isLogin ? "active" : ""}`}
              type="button"
              onClick={() => setTab("signup")}
            >
              Create account
            </button>
          </div>

          <div className="auth-heading">
            <p className="eyebrow">CampusConnect account</p>
            <h2>Keep your campus plans close.</h2>
            <p>Sign in or create an account to get started.</p>
          </div>

          {isLogin ? (
            <form className="login-form" onSubmit={handleLogin}>
              <label htmlFor="login-email">Campus email</label>
              <input
                ref={emailInputRef}
                id="login-email"
                name="email"
                type="email"
                placeholder="you@campus.edu"
                required
              />
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                name="password"
                type="password"
                placeholder="Your password"
                required
              />
              <button className="btn auth-submit" type="submit">
                Sign in <span aria-hidden="true">↗</span>
              </button>
            </form>
          ) : (
            <form className="signup-form" onSubmit={handleSignup}>
              <label htmlFor="signup-name">Full name</label>
              <input
                id="signup-name"
                name="name"
                type="text"
                placeholder="Your name"
                required
              />
              <label htmlFor="signup-email">Campus email</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                placeholder="you@campus.edu"
                required
              />
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                name="password"
                type="password"
                placeholder="At least 6 characters"
                required
              />
              <button className="btn auth-submit" type="submit">
                Create account <span aria-hidden="true">↗</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
