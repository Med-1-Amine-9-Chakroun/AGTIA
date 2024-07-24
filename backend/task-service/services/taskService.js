// const { default: mongoose } = require("mongoose");
// const Task = require("../models/taskModel");

// // get all tasks
// const getTasks = async (userId) => {
//   try {
//     const tasks = Task.find({ categorie: "Task", userId: userId });
//     // while not found
//     if (!tasks || tasks.length === 0) {
//       throw new Error("No Tasks Found");
//     }
//     // while success
//     return tasks;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// // get tasks  by categorie
// const getTasksByCategorie = async (userId, categorie) => {
//   try {
//     // Extraction des tâches en utilisant l'ID utilisateur et la catégorie
//     const tasks = await Task.find({ userId, categorie });

//     // Vérification si des tâches ont été trouvées
//     if (!tasks || tasks.length === 0) {
//       throw new Error("No tasks found");
//     }

//     return tasks;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// module.exports = {
//   getTasksByCategorie,
// };
