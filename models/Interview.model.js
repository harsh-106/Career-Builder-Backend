import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  scheduledTime: { type: Date, required: true },
  mode: { type: String, enum: ["Online", "Offline"], default: "Online" },
  meetingLink: { type: String }, 
  location: { type: String },    
  status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"], default: "Scheduled" },
});

export const Interview = mongoose.model("Interview", interviewSchema);