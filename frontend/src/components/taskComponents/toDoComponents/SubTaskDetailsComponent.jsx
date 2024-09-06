import React, { useState } from "react";
import "./styles/subtasks.css";
import { X } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { removeSubTask } from "../../../redux/features/subtasks";
export default function SubTaskDetailsComponent({ subTask }) {
  const [checked, setChecked] = useState(subTask.statusTask === "Done");
  const dispatch = useDispatch();
  const selectedTask = useSelector((state) => state.tasks.selectedTask);
  const subtasksList = useSelector((state) => state.subTasks.SubTasks);

  const handleToggle = async () => {
    setChecked(!checked);
    console.log(subTask._id); // Log subtask ID when clicking on the parent div
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userObject = JSON.parse(storedUser);
      const userId = userObject.user._id;
      const token = userObject.token;
      const updatedSubTask = { ...subTask }; // Create a shallow copy of subTask
      updatedSubTask.statusTask =
        updatedSubTask.statusTask === "To Do" ? "Done" : "To Do";

      const response = await fetch(
        `http://localhost:3002/task/updateSubTask/${subTask._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSubTask),
        }
      );

      if (!response.ok) {
        console.error("Error:", response.status, response.statusText);
        const errorText = await response.text();
        console.error("Response Text:", errorText);
        throw new Error("Failed to fetch tasks.");
      }

      const data = await response.json();

      // /* TO MOOVE TASK IN ITS RIGTH COLUMN (TO DO, DOING , DONE)*/

      // if (selectedTask.statusTask === "To Do") {
      //   console.log(selectedTask.statusTask);

      //   dispatch(
      //     moveTask({
      //       selectedTask: selectedTask,
      //       from: "toDo",
      //       to: "doing",
      //     })
      //   );
      // } else if (
      //   (selectedTask.statusTask === "To Do" ||
      //     selectedTask.statusTask === "Doing") &&
      //   subtasksList.every((subtask) => subtask.statusTask === "Done")
      // ) {
      //   dispatch(
      //     moveTask({
      //       taskId: selectedTask,
      //       from: selectedTask.statusTask === "To Do" ? "toDo" : "doing",
      //       to: "done",
      //     })
      //   );
      // }
    }
  };

  const handleXClick = async (e) => {
    e.stopPropagation(); // Prevent the event from reaching the parent div
    console.log(1); // Log 1 when clicking on the "X"
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userObject = JSON.parse(storedUser);
      const token = userObject.token;

      const response = await fetch(
        `http://localhost:3002/task/deleteSubTask/${subTask._id}`,
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

      const data = await response.json();
      dispatch(removeSubTask(subTask._id));
    }
  };
  return (
    <div
      className={`checkbox-text-container ${checked ? "checked" : "unchecked"}`}
      onClick={handleToggle}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
        className="hidden-checkbox"
      />
      <span className="custom-checkbox"></span>
      <span className="text">{subTask.titreTask}</span>
      <span className="close-icon">
        <X onClick={handleXClick} /> {/* Call handleXClick when clicking "X" */}
      </span>
    </div>
  );
}
