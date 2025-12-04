import React, { useState } from "react";
import "./style.css";

function CreateIncident({ isOpen, onClose, onSubmit }) {
  const [incident, setIncident] = useState({
    title: "",
    category: "",
    assignedTo: "",
    description: "",
    attachments: []
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIncident(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(incident);
    // Reset form
    setIncident({
      title: "",
      category: "",
      assignedTo: "",
      description: "",
      attachments: []
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setIncident(prev => ({ ...prev, attachments: files }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create Incident</h2>
          <button className="close-button" onClick={onClose}>×</button>
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
              <option value="">Category</option>
              <option value="malware">Malware</option>
              <option value="phishing">Phishing</option>
              <option value="ddos">DDoS Attack</option>
              <option value="data-breach">Data Breach</option>
              <option value="unauthorized-access">Unauthorized Access</option>
              <option value="other">Other</option>
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
                style={{ display: 'none' }}
              />
              <label htmlFor="attachments" className="file-input-label">
                <span className="attach-icon">📎</span>
                Attach files...
              </label>
            </div>
            {incident.attachments.length > 0 && (
              <div className="file-list">
                {incident.attachments.map((file, index) => (
                  <span key={index} className="file-name">{file.name}</span>
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Create Incident
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateIncident;