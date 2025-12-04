// Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

const Header = ({ user }) => {
  const navigate = useNavigate();

  // Load user automatically if not passed
  const saved = localStorage.getItem("user");
  const parsedUser = saved ? JSON.parse(saved) : null;
  const finalUser = user || parsedUser || { username: "User", role: "—" };

  return (
    <header className="nav">
      {/* Left brand section */}
      <div className="nav__left" onClick={() => navigate("/incidents")}>
        <ShieldLogo className="nav__shield" />
        <span className="nav__brand">Senti</span>
      </div>

      {/* Center navigation */}
      <nav className="nav__links">
        <Link to="/incidents" className="nav__link">
          Incidents
        </Link>
      </nav>

      {/* Right user section */}
      <div className="nav__right">
        <div className="nav__avatar"></div>
        <div className="nav__user">
          <div className="nav__user-name">{finalUser.username}</div>
          <div className="nav__user-role">{finalUser.role}</div>
        </div>
      </div>
    </header>
  );
};

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

export default Header;
