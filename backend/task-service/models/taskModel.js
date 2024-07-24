const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  // Required for both task and subtask
  titreTask: {
    type: String,
    required: true,
    unique: true,
  },

  // To do, doing, done, ...
  statusTask: {
    type: String,
    required: false,
  },

  // task, subtask, ...
  categorie: {
    type: String,
    required: true,
  },
  //****************************************************** */
  // Required only for task
  //****************************************************** */
  descriptionTask: {
    type: String,
    required: false,
  },

  // Meeting, shopping, ...
  type: {
    type: String,
    required: false,
  },
  // date debut
  startDate: {
    type: Date,
    required: false,
  },
  // date fin
  endDate: {
    type: Date,
    required: false,
  },

  // heure debut
  startTime: {
    type: Date,
    required: false,
  },

  // heure fin
  endTime: {
    type: Date,
    required: false,
  },

  // priority
  priority: {
    type: String,
    required: false,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // The name of the model being referenced
  },

  // id of task (if it is a subTask)
  relatedTaskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tasks", // The name of the model being referenced
  },
});

module.exports = mongoose.model("Task", taskSchema);
