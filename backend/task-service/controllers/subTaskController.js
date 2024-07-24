const { default: mongoose } = require("mongoose");
const Task = require("../models/taskModel");

// get all subTasks
const getAllSubTasksController = async (req, res) => {
  // extracting task id
  const { idTask } = req.params;
  // task id verification
  if (!mongoose.Types.ObjectId.isValid(idTask)) {
    res.status(404).json({ error: "No subTasks found" });
  }

  try {
    // extracting subtasks using task id
    const subtasks = await Task.find({ relatedTaskId: idTask });
    // while not found
    if (!subtasks) {
      res.status(400).json({ error: "No subTasks found" });
    }
    // while success
    res.status(200).json({ subtasks });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create subTask
const createSubTaskController = async (req, res) => {
  // extracting task id
  const { idTask } = req.params;
  // task id verification
  if (!mongoose.Types.ObjectId.isValid(idTask)) {
    res.status(404).json({ error: "No subTasks found" });
  }
  // initial categorie
  const categorie = "subTask";
  // initial status
  const statusTask = "To do";
  // body attributes
  const { titreTask } = req.body;
  // title verification
  if (!titreTask) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    // adding subTask to DB
    const subtask = Task.create({
      titreTask,
      statusTask,
      categorie,
      relatedTaskId: idTask,
    });
    res.status(200).json({ subtask });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// edit subTask
const editSubTaskController = async (req, res) => {
  // extracting sub task id
  const { idSubTask } = req.params;
  // sub task id verificatin
  if (!mongoose.Types.ObjectId.isValid(idSubTask)) {
    res.status(404).json({ error: "Error occured while updating" });
  }

  try {
    // updating subtask
    const subTask = await Task.findOneAndUpdate(
      { _id: idSubTask },
      { ...req.body }
    );

    // while error
    if (!subTask) {
      res.status(400).json({ error: "Error occured while updating" });
    }
    // while success
    res.satus(200).json({ subTask });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete subtask
const deleteSubTaskController = async (req, res) => {
  // extracting sub task id
  const { idSubTask } = req.params;
  // subtask id verification
  if (!mongoose.Types.ObjectId.isValid(idSubTask)) {
    res.status(404).json({ error: "Error occured while deleting" });
  }

  try {
    const subTask = await Task.findOneAndDelete({ _id: idSubTask });
    // while error
    if (!subTask) {
      res.status(400).json({ error: "Error occured while deleting" });
    }

    // while success
    res.status(200).json({ subTask });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// test subTask controller
const testSubTask = (req, res) => {
  res.send("SubTask controller works");
};

module.exports = {
  getAllSubTasksController,
  createSubTaskController,
  editSubTaskController,
  deleteSubTaskController,
  testSubTask,
};
