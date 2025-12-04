// src/SignUpPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Top Bar */}
      <header className="topbar">
        <div className="topbar_inner">
          <ShieldLogo className="logo" />
          <span className="brand">Senti</span>
        </div>
      </header>

      {/* Canvas */}
      <main className="canvas">
        <section className="decor">
          <span className="shape shape--circle s1" />
          <span className="shape shape--square s2" />
          <span className="shape shape--circle s3" />
          <span className="shape shape--square s4" />
        </section>

        <section className="mount">
          <div className="card">
            <h1 className="card__title">Sign Up</h1>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const username = (fd.get("username") || "").toString().trim();
                const password = (fd.get("password") || "").toString();

                if (!username) return setError("Please enter a username.");
                if (!password) return setError("Please enter a password.");

                setError("");
                setLoading(true);

                try {
                  const res = await fetch("http://localhost:8085/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                  });

                  const data = await res.json();

                  if (!res.ok) {
                    setError(data.message || "Registration failed.");
                    setLoading(false);
                    return;
                  }

                  // Registration success, login then incident dashboard
                  navigate("/login");
                } catch (err) {
                  console.error("Register error (frontend):", err);
                  setError("Network error, please try again.");
                } finally {
                  setLoading(false);
                }
              }}
            >
              <div className="field">
                <label className="label" htmlFor="username">
                  Username
                </label>
                <input
                  className="input"
                  id="username"
                  name="username"
                  placeholder="Choose a username"
                />
              </div>

              <div className="field">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  className="input"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Choose a password"
                />
              </div>

              {error && <div className="error">{error}</div>}

              <div className="actions">
                <button className="btn" type="submit" disabled={loading}>
                  {loading ? "Signing up..." : "Create Account"}
                </button>
              </div>

              {/* If the user already has an account */}
              <div
                className="helper-test"
                style={{ marginTop: "1rem", textAlign: "center" }}
              >
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  style={{
                    color: "#1f50ff",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Log In
                </span>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

function ShieldLogo({ className = "" }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 3.5L6.5 8.5v10.8c0 7.1 5.1 13.7 13.5 17.2 8.4-3.5 13.5-10.1 13.5-17.2V8.5L20 3.5Z"
        stroke="#1f50ff"
        strokeWidth="2"
      />
      <path d="M14 14h12v12H14z" stroke="#1f50ff" strokeWidth="2" />
      <path d="M17 20h6" stroke="#1f50ff" strokeWidth="2" />
    </svg>
  );
}

export default SignUpPage;
