import React, { useEffect } from "react";
import "./styles/subtasks.css";
import SubTaskDetailsComponent from "./SubTaskDetailsComponent";
export default function SubTasksComponent({ idTask }) {
  useEffect(() => {
    getSubTasks(idTask);
  }, []);
  const getSubTasks = async (idTask) => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        console.log(idTask);

        const userObject = JSON.parse(storedUser);
        const token = userObject.token;
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <div className="input-container">
        <input type="text" placeholder="Add a new ToDo..." />
        <button className="add-btn">
          <span className="material-symbols-outlined">add_circle</span>
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
