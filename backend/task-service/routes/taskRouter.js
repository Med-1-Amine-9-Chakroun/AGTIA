const express = require("express");
const { getTasks, createTask } = require("../controllers/taskController");

const router = express.Router();

//*********************************** */
// Task
//*********************************** */

// get all tasks   **
router.get("/allTasks/:idUser", getTasks);

// get task
router.get("/getTask/:idUser/:idTask", getTasks);

// get task by type
router.get("/getTasksByType/:idUser", getTasks);

// get task by categorie
router.get("/getTasksByCategorie/:idUser", getTasks);

// get task by status
router.get("/getTasksByStatus/:idUser", getTasks);

// create task  **
router.post("/createTask", createTask);

// update task
router.put("/updateTask/:idUser/:idTask", createTask);

// delete task
router.delete("/deleteTask/:idUser/:idTask", createTask);

//*********************************** */
// SubTask
//*********************************** */

// get all subTasks
router.get("/getSubTasks/:idUser/:idTask", getTasks);

// create subTask
router.post("/createSubTask/:idTask", createTask);

// update subTask
router.put("/updateSubTask/:idSubTask", createTask);

// delete subTask
router.delete("/deleteSubTask/:idSubTask", createTask);

module.exports = router;
