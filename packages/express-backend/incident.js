import mongoose from "mongoose";

const { Schema } = mongoose;

const IncidentSchema = new Schema(
  {
    incidentId: {
      type: String,
      unique: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    priority: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      required: true,
      trim: true,
      default: "Open",
    },

    assignedToName: {
      type: String,
      default: "Unassigned",
      trim: true,
    },

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "userModel",
      required: false,
    },

    description: {
      type: String,
      trim: true,
    },

    attachments: [
      {
        type: String,
      },
    ],
  },
  {
    collection: "incidents",
  }
);

IncidentSchema.pre("save", async function (next) {
  const doc = this;
  if (!doc.isNew || doc.incidentId) return next();

  let unique = false;

  while (!unique) {
    const randNum = Math.floor(Math.random() * 90000) + 10000;
    const newId = `INC-${randNum}`;

    const existing = await mongoose.models.Incident.findOne({
      incidentId: newId,
    });

    if (!existing) {
      doc.incidentId = newId;
      unique = true;
    }
  }

  next();
});

const Incident = mongoose.model("Incident", IncidentSchema);

export default Incident;
