// incident-services.js
import Incident from "./incident.js";

export async function getIncidents({
  status,
  severity,
  priority,
  category,
  search,
  page = 1,
  limit = 10,
} = {}) {
  const query = {};

  if (status) {
    query.status = status;
  }

  const effectivePriority = priority || severity;
  if (effectivePriority) {
    query.priority = effectivePriority;
  }

  if (category) {
    query.category = category;
  }

  if (search && search.trim()) {
    const regex = new RegExp(search.trim(), "i");
    query.$or = [
      { title: regex },
      { description: regex },
      { assignedToName: regex },
      { incidentId: regex },
      { category: regex },
      { priority: regex },
    ];
  }

  const skip = (page - 1) * limit;

  const [incidents, totalIncidents] = await Promise.all([
    Incident.find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit),
    Incident.countDocuments(query),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalIncidents / limit) || 1);

  return {
    incidents,
    totalPages,
    totalIncidents,
  };
}

export function addIncident(data) {
  const incident = new Incident(data);
  return incident.save();
}

export function getIncidentById(id){
  return Incident.findById(id);
}
