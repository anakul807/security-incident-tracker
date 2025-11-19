import React from "react";
import { Download, Plus, Search } from "lucide-react";

const API_URL = "http://localhost:8085/api";

const Badge = ({ type, children }) => {
  const styles = {
    Critical: "bg-red-600 text-white",
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-blue-100 text-blue-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    Open: "bg-blue-100 text-blue-700",
    Resolved: "bg-green-100 text-green-700",
    Closed: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${styles[type] || "bg-gray-100 text-gray-700"}`}
    >
      {children}
    </span>
  );
};

export default Badge;
