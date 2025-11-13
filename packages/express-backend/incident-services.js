//incident-services.js
import mongoose from "mongoose";
import incidentModel from "./incident.js";

mongoose.set("debug", true);

export function addIncident(incident) {
    const incidentToAdd = new incidentModel(incident);
    const promise = incidentToAdd.save();
    return promise;
}
// Get incidents
export function getIncidents(filters = {}) {
    const query = {};
    if (filters.status) {
    query.status = filters.status;
    }
    if (filters.severity) {
    query.severity = filters.severity;
    }
    return incidentModel.find(query);
}