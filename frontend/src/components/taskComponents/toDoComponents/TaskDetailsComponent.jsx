import React, { useEffect, useState } from "react";
import "./styles/modal.css";
import { X } from "react-feather";
import "./styles/taskDetails.css";
import SubTasksComponent from "./SubTasksComponent";
import { useDispatch } from "react-redux";
import { clearSubTasks } from "../../../redux/features/subtasks";

export default function TaskDetailsComponent({ open, onClose, task, state }) {
  // Initialize state with default values only if editing (state !== "add")
  const dispatch = useDispatch();

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
    if (state === "add") {
      dispatch(clearSubTasks());
    }
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
    else setErrors("");
  };

  // Handle saving the task
  const handleClick = async () => {
    console.log(state);
    validateFields();
    if (state === "add") {
      if (errors === "") {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userObject = JSON.parse(storedUser);
          const userId = userObject.user._id;
          const token = userObject.token;
          console.log(123);

          const newTask = {
            categorie: "Task",
            descriptionTask: description,
            endDate: new Date(endDate).toISOString(),
            endTime: new Date(`${endDate}T${endTime}`).toISOString(),
            priority: priority,
            startDate: new Date(startDate).toISOString(),
            startTime: new Date(`${startDate}T${startTime}`).toISOString(),
            statusTask: "To Do", // Default status for new tasks

            titreTask: title,
            type: type,
          };
          console.log(newTask);
          const response = await fetch(
            `http://localhost:3002/task/createTask/${userId}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newTask),
            }
          );

          if (!response.ok) {
            console.error("Error:", response.status, response.statusText);
            const errorText = await response.text();
            console.error("Response Text:", errorText);
            throw new Error("Failed to fetch tasks.");
          }
          console.log(1234);
          const data = await response.json();
          console.log("New Task:", data);
        }
      }
      // You can now send this task object to the backend
    } else {
      // Handle editing the task
      console.log("Edit Task:", type);
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
