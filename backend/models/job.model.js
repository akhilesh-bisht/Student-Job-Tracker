import mongoose, { Schema, model } from "mongoose";

// Define schema for Job
const jobSchema = new Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: {
    type: String,
    enum: ["Applied", "Interview", "Offer", "Rejected"],
    default: "Applied",
  },
  appliedDate: { type: Date },
  link: String,
});

// Create and export Job model
const Job = model("Job", jobSchema);
export default Job;
