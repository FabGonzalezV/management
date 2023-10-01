import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,

  priority: { type: String },
});
 
export  default mongoose.model('Tasks', TaskSchema);
