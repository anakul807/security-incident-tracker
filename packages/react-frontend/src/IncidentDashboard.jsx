import React, { useState, useEffect } from "react";
import { Download, Plus, Search } from "lucide-react";
import Header from "./Header";
import FilterBar from "./FilterBar";
import IncidentTable from "./IncidentTable";
import Pagination from "./Pagination";
import MyApp from "./MyApp";

const API_URL = "http://localhost:8085/api";

const IncidentDashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  // Fetch incidents from backend
  const fetchIncidents = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: 5,
        search: searchTerm,
        ...filters,
      });

      const response = await fetch(`${API_URL}/incidents?${queryParams}`);

      if (!response.ok) {
        throw new Error("Failed to fetch incidents");
      }

      const data = await response.json();

      // Defensive assignments
      const safeIncidents = Array.isArray(data?.incidents) ? data.incidents : [];
      const safeTotalPages = Number.isFinite(Number(data?.totalPages)) ? Number(data.totalPages) : 1;
      const safeTotalIncidents = Number.isFinite(Number(data?.totalIncidents)) ? Number(data.totalIncidents) : 0;


      // inside the parentheses used to include the data.incidents, data.totalPages, data.totalIncidents
      setIncidents(safeIncidents);
      setTotalPages(safeTotalPages);
      setTotalIncidents(safeTotalIncidents);
      setError(null);
    } catch (err) {
      setError(err?.message || "Unknown error");
      setIncidents([]); // ensure safe defaults after failures
      setTotalPages(1);
      setTotalIncidents(0);
      console.error("Error fetching incidents:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch incidents when filters, search, or page changes
  useEffect(() => {
    fetchIncidents();
  }, [currentPage, searchTerm, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      if (value === "") {
        const newFilters = { ...prev };
        delete newFilters[filterType];
        return newFilters;
      }
      return { ...prev, [filterType]: value };
    });
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleExportCSV = async () => {
    try {
      const response = await fetch(`${API_URL}/incidents/export`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `incidents-${new Date().toISOString()}.csv`;
      a.click();
    } catch (err) {
      console.error("Error exporting CSV:", err);
    }
  };

  // ensure we always pass an array down to the table
  const safeIncidents2 = Array.isArray(incidents) ? incidents : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={{ name: "John Smith", role: "Security Analyst" }} />

      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Incident Management</h1>
          <div className="flex gap-3">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 border rounded-lg bg-white flex items-center gap-2 hover:bg-gray-50 transition"
            >
              <Download size={20} />
              Export CSV
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
              <Plus size={20} />
              New Incident
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            Error: {error}. Make sure your backend is running on {API_URL}
          </div>
        )}

        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        <div className="mt-6">
          <IncidentTable incidents={safeIncidents2} loading={loading} />
          {!loading && Array.isArray(safeIncidents2) && safeIncidents2.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalIncidents={totalIncidents}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default IncidentDashboard;
