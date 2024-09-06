import React, { useEffect, useState } from "react";
import "./styles/modal.css";
import { X } from "react-feather";
import "./styles/taskDetails.css";
import SubTasksComponent from "./SubTasksComponent";
import { useDispatch, useSelector } from "react-redux";
import { clearSubTasks, setSubTask } from "../../../redux/features/subtasks";
import { addTask, selectTask, removeTask } from "../../../redux/features/tasks";

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

  const subtasksList = useSelector((state) => state.subTasks.SubTasks);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(clearSubTasks());
    dispatch(selectTask(task));
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

  const handleClickDelete = async () => {
    console.log(task._id);
    const userConfirmed = confirm("Are you sure you want to delete this task?");
    if (userConfirmed) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userObject = JSON.parse(storedUser);
        const token = userObject.token;

        const response = await fetch(
          `http://localhost:3002/task/deleteTask/${task._id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              // "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.error("Error:", response.status, response.statusText);
          const errorText = await response.text();
          console.error("Response Text:", errorText);
          throw new Error("Failed to fetch tasks.");
        }
        dispatch(
          removeTask({
            taskId: task._id,
            from:
              task.statusTask === "To Do"
                ? "toDo"
                : task.statusTask === "Doing"
                ? "doing"
                : "done",
          })
        );
        setSubTasks("");
        setPriority("");
        setTitle("");
        setDescription("");
        setStartDate("");
        setEndDate("");
        setStartTime("");
        setEndTime("");
        setType("");
        setErrors("");
        dispatch(clearSubTasks());
        dispatch(selectTask({}));
        const data = await response.json();
      }
    }
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

          const data = await response.json();
          dispatch(addTask(data));
          // dispatch(selectTask(data));
          let idTask = data._id;
          const subtaskResponses = [];
          console.log("New Task:", data);
          /*/*   TO ADD SUBTASKS IN DATABASE AND GET THEIR ID*/

          const subtaskPromises = subtasksList.map(async (subtask) => {
            console.log("Processing subtask:", subtask);

            const response = await fetch(
              `http://localhost:3002/task/createSubTask/${idTask}`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(subtask),
              }
            );

            if (!response.ok) {
              console.error("Error:", response.status, response.statusText);
              const errorText = await response.text();
              console.error("Response Text:", errorText);
              throw new Error("Failed to insert subtask.");
            }

            const data = await response.json();
            console.log("Inserted subtask:", data.subtask);

            // Add the inserted subtask response to the list
            console.log(data.subtask);
            return data.subtask;
          });

          // Wait for all subtask insertions to complete
          subtaskResponses.push(...(await Promise.all(subtaskPromises)));

          console.log("All subtasks inserted:", subtaskResponses);

          dispatch(clearSubTasks());

          // dispatch(setSubTask(subtaskResponses));
        }
      }
      // You can now send this task object to the backend
    } else {
      if (errors === "") {
        const updatedTask = { ...task }; // Create a copy of the original task

        if (title !== (task?.titreTask || "")) {
          updatedTask.titreTask = title;
        }
        if (description !== (task?.descriptionTask || "")) {
          updatedTask.descriptionTask = description;
        }
        if (priority !== (task?.priority || "Medium")) {
          updatedTask.priority = priority;
        }
        if (
          startDate !==
          (task?.startDate
            ? new Date(task.startDate).toISOString().split("T")[0]
            : "")
        ) {
          updatedTask.startDate = new Date(startDate).toISOString();
        }
        if (
          endDate !==
          (task?.endDate
            ? new Date(task.endDate).toISOString().split("T")[0]
            : "")
        ) {
          updatedTask.endDate = new Date(endDate).toISOString();
        }
        if (
          startTime !==
          (task?.startTime
            ? new Date(task.startTime).toISOString().split("T")[1].slice(0, 5)
            : "")
        ) {
          updatedTask.startTime = new Date(
            `${startDate}T${startTime}`
          ).toISOString();
        }
        if (
          endTime !==
          (task?.endTime
            ? new Date(task.endTime).toISOString().split("T")[1].slice(0, 5)
            : "")
        ) {
          updatedTask.endTime = new Date(`${endDate}T${endTime}`).toISOString();
        }
        if (type !== (task?.type || "")) {
          updatedTask.type = type;
        }
        // Handle editing the task
        console.log("Edit Task:", updatedTask);

        // *********************************************************************
        // *********************************************************************
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userObject = JSON.parse(storedUser);
          const userId = userObject.user._id;
          const token = userObject.token;

          const response = await fetch(
            `http://localhost:3002/task/updateTask/${updatedTask._id}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedTask),
            }
          );

          if (!response.ok) {
            console.error("Error:", response.status, response.statusText);
            const errorText = await response.text();
            console.error("Response Text:", errorText);
            throw new Error("Failed to fetch tasks.");
          }

          const data = await response.json();
        }
        // *********************************************************************
        // *********************************************************************
      }
    }
  };

  // Handle changes in the select dropdown
  const handleChange = (event) => {
    setPriority(event.target.value);
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
              <button className="delete-btn" onClick={handleClickDelete}>
                Delete
              </button>
              <button className="save-btn" onClick={handleClick}>
                Save
              </button>
            </span>
          </div>
          <div className="modal-container-right">
            {/* SubTasksComponent should allow you to get subtasks */}
            <SubTasksComponent state_A_E={state} />
          </div>
        </div>
      </div>
    </div>
  );
}
