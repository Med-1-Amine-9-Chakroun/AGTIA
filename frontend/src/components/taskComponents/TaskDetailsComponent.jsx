import React from "react";
import "./toDoComponents/styles/modal.css";
import { X } from "react-feather";

export default function TaskDetailsComponent({ open, onClose, children }) {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`modal-backdrop ${open ? "visible" : "invisible"}`}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`modal-content ${open ? "open" : ""}`}
      >
        <button onClick={onClose} className="close-button">
          <X />
        </button>
        <div className="modal-container">
          <h1>Task Details</h1>
          <div className="modal-container-left">
            <input type="text" />
            <textarea name="" id=""></textarea>
            <span>To Do</span>
            <label htmlFor="">
              Start date:
              <input type="text" />
            </label>
            <label htmlFor="">
              End date:
              <input type="text" />
            </label>
            <label htmlFor="">
              Start time:
              <input type="text" />
            </label>
            <label htmlFor="">
              End time:
              <input type="text" />
            </label>
            <hr />
            <label htmlFor="">
              Priority: <select name="" id=""></select>
            </label>
            <label htmlFor="">
              Type:
              <input type="text" />
            </label>
            <span>
              <button>Delete</button> <button>Save</button>
            </span>
          </div>
          <div className="modal-container-right"></div>
        </div>
      </div>
    </div>
  );
}
