import React, { useState } from "react";
import "./style.css";

const API_URL = "http://localhost:8085/api";

function CreateIncident({ isOpen, onClose, onIncidentCreated }) {
  const [incident, setIncident] = useState({
    title: "",
    category: "",
    priority: "",
    assignedTo: "",
    description: "",
    attachments: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIncident((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/incidents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: incident.title,
          category: incident.category,
          priority: incident.priority,
          assignedTo: incident.assignedTo || "Unassigned",
          description: incident.description,
          status: "Open", // Default status for new incidents
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create incident");
      }

      const newIncident = await response.json();

      // Reset form
      setIncident({
        title: "",
        category: "",
        priority: "",
        assignedTo: "",
        description: "",
        attachments: [],
      });

      // Call the callback to refresh the incidents list
      if (onIncidentCreated) {
        onIncidentCreated(newIncident);
      }
    } catch (err) {
      console.error("Error creating incident:", err);
      setError(err.message || "Failed to create incident. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setIncident((prev) => ({ ...prev, attachments: files }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create Incident</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="incident-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Incident Title"
              value={incident.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={incident.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Malware">Malware</option>
              <option value="Phishing">Phishing</option>
              <option value="DDoS">DDoS Attack</option>
              <option value="Data Breach">Data Breach</option>
              <option value="Unauthorized Access">Unauthorized Access</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={incident.priority}
              onChange={handleChange}
              required
            >
              <option value="">Select Priority</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="assignedTo">Assigned to</label>
            <div className="assignee-input">
              <div className="avatar-placeholder"></div>
              <input
                type="text"
                id="assignedTo"
                name="assignedTo"
                placeholder="Unassigned"
                value={incident.assignedTo}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              value={incident.description}
              onChange={handleChange}
              rows="6"
            />
          </div>

          <div className="form-group">
            <label>Attachments</label>
            <div className="file-input-wrapper">
              <input
                type="file"
                id="attachments"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <label htmlFor="attachments" className="file-input-label">
                <span className="attach-icon">📎</span>
                Attach files...
              </label>
            </div>
            {incident.attachments.length > 0 && (
              <div className="file-list">
                {incident.attachments.map((file, index) => (
                  <span key={index} className="file-name">
                    {file.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {error && (
            <div className="error" style={{ 
              marginBottom: "20px", 
              padding: "12px", 
              backgroundColor: "#fee2e2", 
              color: "#b91c1c", 
              borderRadius: "6px",
              fontSize: "14px"
            }}>
              {error}
            </div>
          )}

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
              style={{ margin: "0 auto" }}
            >
              {isSubmitting ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateIncident;