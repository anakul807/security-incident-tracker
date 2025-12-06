import mongoose from "mongoose";

const TestSchema = new mongoose.Schema(
  {
    name: String,
    value: String
  },
  { timestamps: true }
);

export default mongoose.model("Test", TestSchema);
