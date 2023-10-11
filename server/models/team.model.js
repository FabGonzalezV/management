import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdBy: { type: String },
  created: { type: Date, default: Date.now() },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});



export default mongoose.model("Team", TeamSchema);