// src/main.jsx
import React from "react";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import IncidentDashboard from "./IncidentDashboard";
import "./main.css";

function ProtectedRoute({ children }) {
  const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"));
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

// Main app router
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/incidents"
          element={
            <ProtectedRoute>
              <IncidentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Default: go to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

//Create the container
const container = document.getElementById("root");

//Create a root
const root = ReactDOMClient.createRoot(container);

//Initial render: Render an element to the Root
root.render(<AppRouter />);

export default AppRouter;
