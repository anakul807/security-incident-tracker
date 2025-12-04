// src/IncidentDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import "./incident-detail.css";

const API_URL = "http://localhost:8085/api";

const formatDate = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString();
};

const getPriorityModifier = (priority) => {
  const p = (priority || "").toLowerCase();
  if (p === "critical") return "critical";
  if (p === "high") return "high";
  if (p === "medium") return "medium";
  if (p === "low") return "low";
  return "default";
};

function IncidentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/incidents/${id}`);

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "Failed to load incident");
        }

        const data = await res.json();
        setIncident(data);
        setError("");
      } catch (err) {
        console.error("Error loading incident:", err);
        setError(err.message || "Failed to load incident");
      } finally {
        setLoading(false);
      }
    };

    fetchIncident();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="detail-page">
        <Header user={JSON.parse(localStorage.getItem("user"))} />
        <main className="detail-main">
          <button onClick={() => navigate(-1)} className="detail-back">
            <span className="detail-back__icon">←</span>
            <span>Back</span>
          </button>

          <section className="detail-card">
            <p className="detail-loading">Loading incident…</p>
          </section>
        </main>
      </div>
    );
  }

  // Error / not found
  if (error || !incident) {
    return (
      <div className="detail-page">
        <Header user={JSON.parse(localStorage.getItem("user"))} />
        <main className="detail-main">
          <button onClick={() => navigate(-1)} className="detail-back">
            <span className="detail-back__icon">←</span>
            <span>Back</span>
          </button>

          <section className="detail-card">
            <p className="detail-error-title">Failed to load incident.</p>
            <p className="detail-error-text">{error}</p>
          </section>
        </main>
      </div>
    );
  }

  const priorityMod = getPriorityModifier(incident.priority);

  return (
    <div className="detail-page">
      {/* Same top header as dashboard */}
      <Header user={JSON.parse(localStorage.getItem("user"))} />

      <main className="detail-main">
        {/* Back link */}
        <button onClick={() => navigate(-1)} className="detail-back">
          <span className="detail-back__icon">←</span>
          <span>Back</span>
        </button>

        {/* Center card – matches prototype */}
        <section className="detail-card">
          {/* Title + status row */}
          <header className="detail-card__header">
            <div className="detail-title-row">
              <h1 className="detail-title">{incident.title}</h1>
              <span
                className={`detail-priority-dot detail-priority-dot--${priorityMod}`}
              />
            </div>

            <button className="detail-status-pill" type="button">
              <span className="detail-status-pill__label">Status:</span>
              <span className="detail-status-pill__value">
                {incident.status || "Open"}
              </span>
              <span className="detail-status-pill__caret">▾</span>
            </button>
          </header>

          {/* Meta row */}
          <div className="detail-meta">
            <span className="detail-meta__item">
              <span className="detail-meta__label">Incident ID:</span>{" "}
              <span>{incident.incidentId || "—"}</span>
            </span>
            <span className="detail-meta__item">
              <span className="detail-meta__label">Created:</span>{" "}
              <span>{formatDate(incident.createdAt)}</span>
            </span>
            <span className="detail-meta__item detail-meta__item--italic">
              <span className="detail-meta__label">Last Updated:</span>{" "}
              <span>{formatDate(incident.updatedAt)}</span>
            </span>
          </div>

          {/* Description */}
          <p className="detail-body">
            {incident.description || "No description provided."}
          </p>
        </section>
      </main>
    </div>
  );
}

export default IncidentDetail;
