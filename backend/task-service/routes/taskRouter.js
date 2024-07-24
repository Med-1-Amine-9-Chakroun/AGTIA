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
  testTask,
} = require("../controllers/taskController");

const {
  getAllSubTasksController,
  createSubTaskController,
  editSubTaskController,
  deleteSubTaskController,
  testSubTask,
} = require("../controllers/subTaskController");
const router = express.Router();

//*********************************** *///*********************************** *///*********************************** */
// Task
//*********************************** *///*********************************** *///*********************************** */

// get all tasks   **
router.get("/allTasks/:userId", getTasksController);

// get task
router.get("/getTask/:idTask", getTaskByIdController);

// get task by type
router.get("/getTasksByType/:idUser", getTasksByTypeController);

// get task by categorie
router.get("/getTasksByCategorie/:idUser", getTasksByCategorieController);

// get task by status
router.get("/getTasksByStatus/:idUser", getTasksByStatusController);

// create task  **
router.post("/createTask/:userId", createTaskController);

// update task
router.put("/updateTask/:idTask", editTaskController);

// delete task
router.delete("/deleteTask/:idTask", deleteTaskController);

// test task
router.get("/test", testTask);

//*********************************** *///*********************************** *///*********************************** */
// SubTask
//*********************************** *///*********************************** *///*********************************** */

// get all subTasks
router.get("/getSubTasks/:idTask", getAllSubTasksController);

// create subTask
router.post("/createSubTask/:idTask", createSubTaskController);

// update subTask
router.put("/updateSubTask/:idSubTask", editSubTaskController);

// delete subTask
router.delete("/deleteSubTask/:idSubTask", deleteSubTaskController);

// test subTask
router.get("/subTaskTest", testSubTask);

module.exports = router;
