// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import CreateIncident from "./CreateIncident";

function MyApp() {
  const [characters, setCharacters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function removeOneCharacter(userId) {
    fetch(`http://localhost:8085/users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          const updated = characters.filter((user) => user._id !== userId);
          setCharacters(updated);
        } else if (response.status === 404) {
          console.log("User not found on backend");
        } else {
          console.log("Failed to delete user");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8085/users");
    return promise;
  }

  function postUser(person) {
    return fetch("http://localhost:8085/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  }

  function handleCreateIncident(incident) {
    postUser(incident)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create user");
        }
        return response.json();
      })
      .then((newUser) => {
        setCharacters([...characters, newUser]);
        setIsModalOpen(false); // Close modal on success
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>Incident Management</h1>
        <button 
          className="new-incident-button"
          onClick={() => setIsModalOpen(true)}
        >
          + New Incident
        </button>
      </div>

      <Table characterData={characters} removeCharacter={removeOneCharacter} />

      <CreateIncidentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateIncident}
      />
    </div>
  );
}

export default MyApp;
