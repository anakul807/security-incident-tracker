//incident-services.js
import mongoose from "mongoose";
import incidentModel from "./incident.js";

mongoose.set("debug", true);

export function addIncident(incident) {
    const incidentToAdd = new incidentModel(incident);
    const promise = incidentToAdd.save();
    return promise;
}