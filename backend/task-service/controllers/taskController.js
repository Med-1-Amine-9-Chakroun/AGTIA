const { default: mongoose } = require("mongoose");
const Task = require("../models/taskModel");

// get all tasks
const getTasksController = (req, res) => {
  // user id extraction
  const { userId } = req.params;
  // user id verification
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(404).json({ error: "No data found" });
  }
  // extracting alll tasks
  try {
    const tasks = Task.find({ categorie: "Task", userId: userId });
    // while not found
    if (!tasks) {
      res.status(400).json({ error: "No Tasks Found" });
    }
    // while success
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get task by ID
const getTaskByIdController = (req, res) => {
  // id task extraction
  const { taskId } = req.params;
  // id task verification
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(404).json({ error: "Task not found" });
  }

  // extracting task
  try {
    const task = Task.findOne({ _id: taskId });
    // while not found
    if (!task) {
      res.status(400).json({ error: "Task not found" });
    }
    // while success
    res.status(200).json({ task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get tasks by type
const getTasksByTypeController = (req, res) => {
  // extracting type
  const { type } = req.body;
  // extracting user id
  const { userId } = req.params;
  // user id verification
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(404).json({ error: "No tasks found " });
  }

  try {
    // extracting tasks using user id and type
    const tasks = Task.find({ userId: userId, type: type });

    // while not found
    if (!tasks) {
      res.status(400).json({ error: "No tasks found" });
    }
    // while success
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get tasks by categorie
const getTasksByCategorieController = async (req, res) => {
  // categorie extraction
  const { categorie } = req.body;
  // user id extraction
  const { userId } = req.params;
  // user id verification
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(404).json({ error: "No tasks found" });
  }

  try {
    // extracting tasks using user id and categorie
    // Utilisation du service pour récupérer les tâches
    const tasks = await getTasksByCategorie(userId, categorie);

    // while success
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get tasks by status
const getTasksByStatusController = (req, res) => {
  // extracting status
  const { status } = req.body;
  // extracting user id
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(404).json({ error: "No tasks found" });
  }

  try {
    // extracting tasks using user id and status
    const tasks = Task.find({ userId: userId, status: status });
    // while not found
    if (!tasks) {
      res.status(400).json({ error: "No tasks found" });
    }
    // while success
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create task
const createTaskController = async (req, res) => {
  // id user
  const { userId } = req.params;
  console.log(userId);
  // id user verification
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(404).json({ error: "No such task" });
  }
  // initial categorie
  const categorie = "task";

  // body attributes
  const {
    titreTask,
    statusTask,
    descriptionTask,
    type,
    startDate,
    endDate,
    startTime,
    endTime,
    priority,
  } = req.body;

  // title verification
  if (!titreTask) {
    return res.status(400).json({ error: "Title is required" });
  }

  // status initialisation
  if (!statusTask) {
    statusTask = "To do";
  }

  try {
    // adding task to DB
    const task = await Task.create({
      titreTask,
      statusTask,
      descriptionTask,
      type,
      startDate,
      endDate,
      startTime,
      endTime,
      priority,
      statusTask,
      categorie,
      userId,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// edit task
const editTaskController = async (req, res) => {
  // id task extraction
  const { taskId } = req.params;
  console.log(taskId);
  // idTask verification
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(404).json({ error: "No such task" });
  }

  // editing
  try {
    const task = await Task.findOneAndUpdate({ _id: taskId }, { ...req.body });

    // while error
    if (!task) {
      res.status(400).json({ error: "Error while updating task" });
    }
    // while success
    res.status(200).json({ task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete task
const deleteTaskController = async (req, res) => {
  // task id extraction
  const { taskId } = req.params;
  // task id verification
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(404).json({ error: "Error while deleting " });
  }

  // deleting task
  try {
    const task = await Task.findOneAndDelete({ _id: taskId });
    // while error
    if (!task) {
      res.status(400).json({ error: "Error while deleting" });
    }

    // while success
    res.status(200).json({ task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTasksController,
  getTaskByIdController,
  getTasksByTypeController,
  getTasksByCategorieController,
  getTasksByStatusController,
  createTaskController,
  editTaskController,
  deleteTaskController,
};
