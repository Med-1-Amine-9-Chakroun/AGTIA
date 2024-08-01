const express = require("express");
const requireAuth = require("../middleware/requireAuth");
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

// verify authentification
router.use(requireAuth);

//*********************************** *///*********************************** *///*********************************** */
// Task
//*********************************** *///*********************************** *///*********************************** */

// get all tasks   **
router.get("/allTasks/:userId", getTasksController);

// get task
router.get("/getTask/:idTask", getTaskByIdController);

// get task by type
router.get("/getTasksByType/:userId", getTasksByTypeController);

// get task by categorie
router.get("/getTasksByCategorie/:userId", getTasksByCategorieController);

// get task by status
router.get("/getTasksByStatus/:userId", getTasksByStatusController);

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
router.post("/createSubTask/:relatedTaskId", createSubTaskController);

// update subTask
router.put("/updateSubTask/:idSubTask", editSubTaskController);

// delete subTask
router.delete("/deleteSubTask/:idSubTask", deleteSubTaskController);

// test subTask
router.get("/subTaskTest", testSubTask);

module.exports = router;
