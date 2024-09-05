import React, { useEffect, useState } from "react";
import "./styles/subtasks.css";
import SubTaskDetailsComponent from "./SubTaskDetailsComponent";
import { useSelector } from "react-redux";

export default function SubTasksComponent({ state }) {
  const selectedTask = useSelector((state) => state.tasks.selectedTask);
  const subtasksList = useSelector((state) => state.subTasks.SubTasks);
  // const selectedSubTask = useSelector((state) => state.tasks.selectedSubTask);
  const [subtasks, setSubTasks] = useState([]);

  useEffect(() => {
    // console.log("Selected Task:", selectedTask);
    // console.log("Selected SubTask:", selectedSubTask);

    if (selectedTask.subtasks) {
      if (state === "add") {
        setSubTasks([]);
      } else {
        setSubTasks(selectedTask.subtasks);
      }

      // console.log(
      //   "Setting Subtasks from Selected Task:",
      //   selectedTask.subtasks
      // );
    }
    // else if (selectedSubTask) {
    //   setSubTasks(selectedSubTask);
    //   console.log("Setting Subtasks from Selected SubTask:", selectedSubTask);
    // }
  }, [selectedTask]);

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
        {subtasksList.length > 0 ? (
          subtasksList.map((subtask, index) => (
            <SubTaskDetailsComponent key={index} subTask={subtask} />
          ))
        ) : (
          <p>No subtasks added yet</p>
        )}
      </div>
    </div>
  );
}
