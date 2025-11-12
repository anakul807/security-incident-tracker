import React, { useState, useEffect } from 'react';
import { Download, Plus, Search } from 'lucide-react';

const API_URL = 'http://localhost:8085/api';

const Pagination = ({ currentPage, totalPages, totalIncidents, onPageChange }) => {
  const startIndex = (currentPage - 1) * 5 + 1;
  const endIndex = Math.min(currentPage * 5, totalIncidents);

  return (
    <div className="flex items-center justify-between mt-4 px-6 py-4 bg-gray-100 rounded-lg">
      <div className="text-sm text-gray-600">
        Showing {startIndex} to {endIndex} ({totalIncidents} total)
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-lg bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
        >
          Previous
        </button>
        {[...Array(Math.min(totalPages, 3))].map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded-lg transition ${
                page === currentPage 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          );
        })}
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-lg bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};