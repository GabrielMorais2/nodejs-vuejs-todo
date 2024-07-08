const taskModel = require("../models/taskModel");

const getAll = async (_req, res) => {
  try {
    const tasks = await taskModel.getAll();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(400).json({ error: "Failed to fetch tasks" });
  }
};

const createTask = async (req, res) => {
  try {
    const [createdTask] = await taskModel.createTask(req.body);
    return res.status(201).json(createdTask);
  } catch (error) {
    return res.status(400).json({ error: "Failed to create task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await taskModel.deleteTask(id);
    return res.status(204).json();
  } catch (error) {
    return res.status(400).json({ error: "Failed to delete task" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    await taskModel.updateTask(id, req.body);
    return res.status(204).json();
  } catch (error) {
    return res.status(400).json({ error: "Failed to update task" });
  }
};

const updateStatusTask = async (req, res) => {
  try {
    const { id } = req.params;
    await taskModel.updateStatusTask(id, req.body);
    return res.status(204).json();
  } catch (error) {
    return res.status(400).json({ error: "Failed to update task status" });
  }
};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
  updateStatusTask
};