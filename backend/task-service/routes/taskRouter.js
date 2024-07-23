const express = require("express");
const { getTasks, createTask } = require("../controllers/taskController");

const router = express.Router();

//*********************************** */
// Task
//*********************************** */

// get all tasks
router.get("/allTasks/:idUser", getTasks);

// create task
router.get("/createTask", createTask);

//*********************************** */
// SubTask
//*********************************** */

// get all tasks
router.get("/SubTasks/:idUser/:idTask", getTasks);

// create task
router.get("/createSubTas/:idUser/:idTask", createTask);

module.exports = router;
