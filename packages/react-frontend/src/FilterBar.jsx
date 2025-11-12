import React, { useState, useEffect } from 'react';
import { Download, Plus, Search } from 'lucide-react';

const API_URL = 'http://localhost:8085/api';


const FilterBar = ({ searchTerm, onSearchChange, filters, onFilterChange, onClearFilters }) => {
  return (
    <div className="flex gap-4 items-center flex-wrap">
      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search incidents..."
          value={searchTerm}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <select 
        className="px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={filters.status || ''}
        onChange={(e) => onFilterChange('status', e.target.value)}
      >
        <option value="">Status</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
        <option value="Closed">Closed</option>
      </select>

      <select 
        className="px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={filters.priority || ''}
        onChange={(e) => onFilterChange('priority', e.target.value)}
      >
        <option value="">Priority</option>
        <option value="Critical">Critical</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <select 
        className="px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={filters.category || ''}
        onChange={(e) => onFilterChange('category', e.target.value)}
      >
        <option value="">Category</option>
        <option value="Unauthorized Access">Unauthorized Access</option>
        <option value="Malware">Malware</option>
        <option value="DDoS">DDoS</option>
        <option value="Phishing">Phishing</option>
      </select>

      <button 
        onClick={onClearFilters}
        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
      >
        Clear Filters
      </button>
    </div>
  );
};