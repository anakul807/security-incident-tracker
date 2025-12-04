// src/main.jsx
// also used as the router for pages!
import React from "react";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import IncidentDashboard from "./IncidentDashboard";
import IncidentDetail from "./IncidentDetail";
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
        <Route path="/" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/incidents/:id" element={<IncidentDetail />}/>
        

        <Route
          path="/incidents"
          element={
            <ProtectedRoute>
              <IncidentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Default: go to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
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
