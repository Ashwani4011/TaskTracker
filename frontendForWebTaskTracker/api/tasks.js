import connectDB from "../lib/db";
import TaskTracker from "../models/TaskTracker";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const tasks = await TaskTracker.find().sort({ createdAt: -1 });
    return res.status(200).json(tasks);
  }

  if (req.method === "POST") {
    const task = await TaskTracker.create(req.body);
    return res.status(201).json(task);
  }

  if (req.method === "PUT") {
    const { id } = req.query;
    const task = await TaskTracker.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(task);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    await TaskTracker.findByIdAndDelete(id);
    return res.status(204).end();
  }

  res.status(405).json({ message: "Method not allowed" });
}
