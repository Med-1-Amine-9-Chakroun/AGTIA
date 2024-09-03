import React, { useEffect, useState } from "react";
import "./styles/modal.css";
import { X } from "react-feather";
import "./styles/taskDetails.css";
import SubTasksComponent from "./SubTasksComponent";
export default function TaskDetailsComponent({ open, onClose, task }) {
  const [subTasks, setSubTasks] = useState([]);
  // Initialize state with a default value
  const [priority, setPriority] = useState(task.priority); // You can change 'Medium' to any default value

  // Handle changes in the select dropdown
  const handleChange = (event) => {
    setPriority(event.target.value);
  };
  useEffect(() => {
    // getSubtasks(task._id);
  }, []);
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
          <X />
        </button>
        <h1>Task Details</h1>
        <div className="modal-container">
          <div className="modal-container-left">
            <input type="text" className="titleInput" value={task.titreTask} />
            <textarea name="" id="" value={task.descriptionTask}></textarea>
            <span className="status">{task.statusTask}</span>
            <label htmlFor="">
              <p>Start date:</p>

              <input
                type="date"
                value={new Date(task.startDate).toISOString().split("T")[0]}
              />
            </label>
            <label htmlFor="">
              <p>End date:</p>

              <input
                type="date"
                value={new Date(task.endDate).toISOString().split("T")[0]}
              />
            </label>
            <label htmlFor="">
              <p>Start time:</p>

              <input
                type="time"
                value={new Date(task.startTime)
                  .toISOString()
                  .split("T")[1]
                  .slice(0, 5)}
              />
            </label>
            <label htmlFor="">
              <p>End time:</p>

              <input
                type="time"
                value={new Date(task.endTime)
                  .toISOString()
                  .split("T")[1]
                  .slice(0, 5)}
              />
            </label>
            <hr />
            <div className="bottom-data">
              <label htmlFor="">
                <p>Priority:</p>
                <select name="" id="" value={priority} onChange={handleChange}>
                  <option value="Very Low">Very Low</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Very High">Very High</option>
                </select>
              </label>
              <label htmlFor="">
                <p>Type:</p>

                <input type="text" value={task.type} />
              </label>
            </div>

            <span className="buttons">
              <button className="delete-btn">Delete</button>
              <button className="save-btn">Save</button>
            </span>
          </div>
          <div className="modal-container-right">
            <SubTasksComponent idTask={task._id} />
          </div>
        </div>
      </div>
    </div>
  );
}
