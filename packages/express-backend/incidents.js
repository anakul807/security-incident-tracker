import mongoose from "mongoose";

const IncidentSchema = new mongoose.Schema(
    {
        incidentId: {
            type: String,
            unique: true,
        },
        title: {
            type: String,
            //Untitled placeholder in frontend
        },
        status: {
            type: String,
            trim: true,
            required: true,
        },
        description: {
            type: String,
            trim: true,
            //add description placeholder in frontend
        },
        tags: {
            //Stored as an array
            type: [String],
            default: [],
        }
    },
    {
        collection: "incidents",
        timestamps: true
    }
);

//Generate random unique ID
IncidentSchema.pre("save", async function (next){
    const doc = this;

    //For only new documents
    if (!doc.isNew) return next(); 

    let unique = false;

    while (!unique){
        //generates random 5 digit number
        const randNum = Math.floor(Math.random() * 90000) + 10000
        const newId = `event-${randNum}`;
        
        //Making sure it's unique
        const existing = await mongoose.models.Incident.findOne({incidentId: newId});
        if (!existing) {
            doc.incidentID = newId;
            unique = true;
        }
    }

    next();
});

const Incident = mongoose.model("Incident", IncidentSchema);

export default Incident;