import React from "react";
import "./styles/subtasks.css";
import SubTaskDetailsComponent from "./SubTaskDetailsComponent";
export default function SubTasksComponent() {
  return (
    <div>
      <div className="input-container">
        <input type="text" placeholder="Add a new ToDo..." />
        <button className="add-btn">
          <span class="material-symbols-outlined">add_circle</span>
          <p> Add</p>
        </button>
      </div>
      <div className="subtasks-list">
        <SubTaskDetailsComponent />
        <SubTaskDetailsComponent />
        <SubTaskDetailsComponent />
        <SubTaskDetailsComponent />
        <SubTaskDetailsComponent />
        <SubTaskDetailsComponent />
        <SubTaskDetailsComponent />
        <SubTaskDetailsComponent />
        <SubTaskDetailsComponent />
        <SubTaskDetailsComponent />
        <SubTaskDetailsComponent />
        <SubTaskDetailsComponent />
        <SubTaskDetailsComponent />
        <SubTaskDetailsComponent />
      </div>
    </div>
  );
}
