import React from 'react';
import { Download, Plus, Search } from 'lucide-react';

const API_URL = 'http://localhost:8085/api';

const IncidentTable = ({ incidents, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <div className="text-gray-500">Loading incidents...</div>
      </div>
    );
  }

  if (incidents.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <div className="text-gray-500">No incidents found</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-6 py-3 font-semibold text-gray-700">Title</th>
            <th className="text-left px-6 py-3 font-semibold text-gray-700">Priority</th>
            <th className="text-left px-6 py-3 font-semibold text-gray-700">Status</th>
            <th className="text-left px-6 py-3 font-semibold text-gray-700">Category</th>
            <th className="text-left px-6 py-3 font-semibold text-gray-700">Assigned to</th>
            <th className="text-left px-6 py-3 font-semibold text-gray-700">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr key={incident._id} className="border-t hover:bg-gray-50 transition">
              <td className="px-6 py-4">
                <div className="font-semibold">{incident.title}</div>
                <div className="text-sm text-gray-500">{incident.incidentId}</div>
              </td>
              <td className="px-6 py-4">
                <Badge type={incident.priority}>{incident.priority}</Badge>
              </td>
              <td className="px-6 py-4">
                <Badge type={incident.status}>{incident.status}</Badge>
              </td>
              <td className="px-6 py-4">{incident.category}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <span>{incident.assignedTo}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-600">{incident.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentTable;