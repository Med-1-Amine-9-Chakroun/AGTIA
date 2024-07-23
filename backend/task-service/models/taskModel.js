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
  StatusTask: {
    type: String,
    required: true,
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
  endDate: {
    type: Date,
    required: false,
  },

  // priority
  priority: {
    type: String,
    required: false,
  },

  // ids of subtasks
  //   relatedId: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Task", // The name of the model being referenced
  //     },

  //   ],
});

module.exports = mongoose.model("Task", taskSchema);
