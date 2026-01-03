import connectDB from "../lib/db";
import TaskTracker from "../models/TaskTracker";

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;

  try {
    if (req.method === "GET") {
      if (id) {
        const task = await TaskTracker.findById(id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        return res.status(200).json(task);
      }
      const tasks = await TaskTracker.find().sort({ createdAt: -1 });
      return res.status(200).json(tasks);
    }

    if (req.method === "POST") {
      const task = await TaskTracker.create(req.body);
      return res.status(201).json(task);
    }

    if (req.method === "PUT") {
      const task = await TaskTracker.findByIdAndUpdate(id, req.body, { new: true });
      if (!task) return res.status(404).json({ message: "Task not found" });
      return res.status(200).json(task);
    }

    if (req.method === "DELETE") {
      await TaskTracker.findByIdAndDelete(id);
      return res.status(204).end();
    }

    res.status(405).json({ message: "Method not allowed" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
