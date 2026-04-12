import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  image: String,
  mentor: String,
  startTime: String,
  endTime: String,
   createdAt: { type: Date, default: Date.now },
  category: {
    type: String,
    required: true,
    enum: ["Workshop", "Seminar", "Hackathon", "Webinar"],
  },

}, { timestamps: true });

export default mongoose.model("Event", eventSchema);