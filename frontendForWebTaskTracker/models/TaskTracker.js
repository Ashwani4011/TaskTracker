import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: String,
  priority: String,
  status: String
}, { timestamps: true });

export default mongoose.models.TaskTracker || mongoose.model("TaskTracker", TaskSchema);
