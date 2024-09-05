import React, { useEffect, useState } from "react";
import "./styles/modal.css";
import { X } from "react-feather";
import "./styles/taskDetails.css";
import SubTasksComponent from "./SubTasksComponent";

export default function TaskDetailsComponent({ open, onClose, task, state }) {
  // Initialize state with default values only if editing (state !== "add")
  const [subTasks, setSubTasks] = useState([]);
  const [priority, setPriority] = useState(
    state === "add" ? "Medium" : task?.priority || "Medium"
  );
  const [title, setTitle] = useState(
    state === "add" ? "" : task?.titreTask || ""
  );
  const [description, setDescription] = useState(
    state === "add" ? "" : task?.descriptionTask || ""
  );
  const [startDate, setStartDate] = useState(
    state !== "add" && task?.startDate
      ? new Date(task.startDate).toISOString().split("T")[0]
      : ""
  );
  const [endDate, setEndDate] = useState(
    state !== "add" && task?.endDate
      ? new Date(task.endDate).toISOString().split("T")[0]
      : ""
  );
  const [startTime, setStartTime] = useState(
    state !== "add" && task?.startTime
      ? new Date(task.startTime).toISOString().split("T")[1].slice(0, 5)
      : ""
  );
  const [endTime, setEndTime] = useState(
    state !== "add" && task?.endTime
      ? new Date(task.endTime).toISOString().split("T")[1].slice(0, 5)
      : ""
  );
  const [type, setType] = useState(state !== "add" ? task?.type || "" : "");

  // Error state for form validation
  const [errors, setErrors] = useState(open === true ? "" : "");
  useEffect(() => {
    setErrors("");
  }, [open]);

  const validateFields = () => {
    let newErrors = {};

    if (!title) setErrors("Title is required");
    else if (!startDate) setErrors("Start date is required");
    else if (!endDate) setErrors("End date is required");
    else if (!startTime) setErrors("Start time is required");
    else if (!endTime) setErrors("End time is required");
    else if (!type) setErrors("Type is required");
  };

  // Handle saving the task
  const handleClick = () => {
    console.log(errors);

    if (validateFields()) {
      if (state === "add") {
        const newTask = {
          categorie: "Task",
          descriptionTask: description,
          endDate: new Date(endDate).toISOString(),
          endTime: new Date(`${endDate}T${endTime}`).toISOString(),
          priority: priority,
          startDate: new Date(startDate).toISOString(),
          startTime: new Date(`${startDate}T${startTime}`).toISOString(),
          statusTask: "To Do", // Default status for new tasks
          subtasks: subTasks.map((subtask) => ({
            titreTask: subtask.title,
            statusTask: subtask.statusTask || "To Do",
            categorie: "SubTask",
            relatedTaskId: subtask.relatedTaskId || [],
          })),
          titreTask: title,
          type: type,
          userId: "669fb20dc184f1a36b841465", // Example userId
        };

        console.log("New Task:", newTask);
        // You can now send this task object to the backend
      } else {
        // Handle editing the task
        console.log("Edit Task:", type);
      }
    }
  };

  // Handle changes in the select dropdown
  const handleChange = (event) => {
    setPriority(event.target.value);
  };

  // Fetch subtasks from SubTasksComponent (Assuming it provides an API for this)
  const handleSubTasksChange = (newSubTasks) => {
    setSubTasks(newSubTasks); // SubTasksComponent should call this to pass subtasks
  };
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`modal-backdrop ${open ? "visible" : "invisible"}`}
    >
      {/* modal */}
      <div
        style={{ width: "65%" }}
        onClick={(e) => e.stopPropagation()}
        className={`modal-content ${open ? "open" : ""}`}
      >
        <button onClick={onClose} className="close-button">
          <X className="x" />
        </button>
        <h1>{state === "add" ? "Add New Task" : "Task Details"}</h1>
        <div className="modal-container">
          <div className="modal-container-left">
            <input
              type="text"
              className="titleInput"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              name=""
              id=""
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <span className="status">{task?.statusTask || "To Do"}</span>

            <label>
              <p>Start date:</p>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label>
              <p>End date:</p>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
            <label>
              <p>Start time:</p>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </label>
            <label>
              <p>End time:</p>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </label>
            <hr />
            <div className="bottom-data">
              <label>
                <p>Priority:</p>
                <select value={priority} onChange={handleChange}>
                  <option value="Very Low">Very Low</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Very High">Very High</option>
                </select>
              </label>
              <label>
                <p>Type:</p>
                <input
                  type="text"
                  placeholder="Task Type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </label>
            </div>
            {errors && <p className="error-message">{errors}</p>}
            <span className="buttons">
              <button className="delete-btn">Delete</button>
              <button className="save-btn" onClick={handleClick}>
                Save
              </button>
            </span>
          </div>
          <div className="modal-container-right">
            {/* SubTasksComponent should allow you to get subtasks */}
            <SubTasksComponent onSubTasksChange={setSubTasks} />
          </div>
        </div>
      </div>
    </div>
  );
}
