const express = require("express");
const {
  getTasksController,
  getTaskByIdController,
  getTasksByTypeController,
  getTasksByCategorieController,
  getTasksByStatusController,
  createTaskController,
  editTaskController,
  deleteTaskController,
} = require("../controllers/taskController");

const router = express.Router();

//*********************************** *///*********************************** *///*********************************** */
// Task
//*********************************** *///*********************************** *///*********************************** */

// get all tasks   **
router.get("/allTasks/:idUser", getTasksController);

// get task
router.get("/getTask/:idTask", getTaskByIdController);

// get task by type
router.get("/getTasksByType/:idUser", getTasksByTypeController);

// get task by categorie
router.get("/getTasksByCategorie/:idUser", getTasksByCategorieController);

// get task by status
router.get("/getTasksByStatus/:idUser", getTasksByStatusController);

// create task  **
router.post("/createTask/:idUser", createTaskController);

// update task
router.put("/updateTask/:idTask", editTaskController);

// delete task
router.delete("/deleteTask/:idTask", deleteTaskController);

//*********************************** *///*********************************** *///*********************************** */
// SubTask
//*********************************** *///*********************************** *///*********************************** */

// get all subTasks
router.get("/getSubTasks/:idUser/:idTask", getTasks);

// create subTask
router.post("/createSubTask/:idTask", createTask);

// update subTask
router.put("/updateSubTask/:idSubTask", createTask);

// delete subTask
router.delete("/deleteSubTask/:idSubTask", createTask);

module.exports = router;
