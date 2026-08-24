import { Link } from "react-router-dom";
import { readFromLocalStorage, saveToLocalStorage } from "../utils/storage.js";
import { showToast } from "../context/ToastContext.jsx";

function showForm(formName) {
  const loginForm = document.querySelector(".login-form");
  const signupForm = document.querySelector(".signup-form");
  const loginTab = document.querySelector(".login-tab");
  const signupTab = document.querySelector(".signup-tab");
  const showLogin = formName === "login";

  loginForm.style.display = showLogin ? "block" : "none";
  signupForm.style.display = showLogin ? "none" : "block";
  loginTab.classList.toggle("active", showLogin);
  signupTab.classList.toggle("active", !showLogin);
}

export default function Auth() {
  function handleLogin(event) {
    event.preventDefault();

    const email = event.target.email.value.trim().toLowerCase();
    const password = event.target.password.value;
    const users = readFromLocalStorage("users", []);
    const user = users.find(function (item) {
      return item.email === email && item.password === password;
    });

    if (!user) {
      showToast("Email or password is not correct.", true);
      return;
    }

    saveToLocalStorage("activeUser", {
      name: user.name,
      email: user.email,
    });
    showToast("Welcome back!");
    window.location.href = "/";
  }

  function handleSignup(event) {
    event.preventDefault();

    const name = event.target.name.value.trim();
    const email = event.target.email.value.trim().toLowerCase();
    const password = event.target.password.value;
    const users = readFromLocalStorage("users", []);

    if (!name || !email || password.length < 6) {
      showToast(
        "Please complete all fields and use 6 password characters.",
        true,
      );
      return;
    }

    const accountAlreadyExists = users.some(function (user) {
      return user.email === email;
    });

    if (accountAlreadyExists) {
      showToast("This email already has an account.", true);
      return;
    }

    users.push({
      name: name,
      email: email,
      password: password,
    });
    saveToLocalStorage("users", users);
    saveToLocalStorage("activeUser", { name: name, email: email });
    showToast("Account created!");
    window.location.href = "/";
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
              className="login-tab active"
              type="button"
              onClick={() => showForm("login")}
            >
              Sign in
            </button>
            <button
              className="signup-tab"
              type="button"
              onClick={() => showForm("signup")}
            >
              Create account
            </button>
          </div>

          <div className="auth-heading">
            <p className="eyebrow">CampusConnect account</p>
            <h2>Keep your campus plans close.</h2>
            <p>Sign in or create an account to get started.</p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="login-email">Campus email</label>
            <input
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

          <form
            className="signup-form"
            onSubmit={handleSignup}
            style={{ display: "none" }}
          >
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

        </div>
      </section>
    </main>
  );
}
