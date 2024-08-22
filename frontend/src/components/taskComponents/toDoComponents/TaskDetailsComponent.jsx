import React from "react";
import "./styles/modal.css";
import { X } from "react-feather";
import "./styles/taskDetails.css";
import SubTasksComponent from "./SubTasksComponent";
export default function TaskDetailsComponent({ open, onClose, children }) {
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
            <input type="text" className="titleInput" />
            <textarea name="" id=""></textarea>
            <span className="status">To Do</span>
            <label htmlFor="">
              <p>Start date:</p>

              <input type="date" />
            </label>
            <label htmlFor="">
              <p>End date:</p>

              <input type="date" />
            </label>
            <label htmlFor="">
              <p>Start time:</p>

              <input type="time" />
            </label>
            <label htmlFor="">
              <p>End time:</p>

              <input type="time" />
            </label>
            <hr />
            <div className="bottom-data">
              <label htmlFor="">
                <p>Priority:</p>
                <select name="" id=""></select>
              </label>
              <label htmlFor="">
                <p>Type:</p>

                <input type="text" />
              </label>
            </div>

            <span className="buttons">
              <button className="delete-btn">Delete</button>
              <button className="save-btn">Save</button>
            </span>
          </div>
          <div className="modal-container-right">
            <SubTasksComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
