import mongoose from "mongoose";

const IncidentSchema = new mongoose.Schema(
    {
        incidentID: {
            type: String,
            unique: true,
            trim: true,
        },
        name: {
            type: String,
            default: "Untitled",
        },
        created: {
            type: String,

        }
    },
    {collection: "incidents"}
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
        const newID = `event-${randNum}`;
        
        //Making sure it's unique
        const existing = await mongoose.models.Incident.findOne({IncidentID: newID});
        if (!existing) {
            doc.IncidentID = newID;
            unique = true;
        }
    }

    next();
});

const Incident = mongoose.model("Incident", IncidentSchema);

export default Incident;