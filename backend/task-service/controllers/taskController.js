const Task = require("../models/taskModel");

const getTasks = (req, res) => {
  try {
    const tasks = Task.find({ categorie: "Task" });
    if (!tasks) {
      res.status(404).json({ error: "No Tasks Found" });
    }
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createTask = (req, res) => {
  res.send("hello");
};
module.exports = {
  getTasks,
  createTask,
};
