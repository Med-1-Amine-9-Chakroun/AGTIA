import React, { useEffect, useState } from "react";
import "./styles/subtasks.css";
import SubTaskDetailsComponent from "./SubTaskDetailsComponent";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addSubTask } from "../../../redux/features/subtasks";

export default function SubTasksComponent({ state_A_E }) {
  const selectedTask = useSelector((state) => state.tasks.selectedTask);
  const subtasksList = useSelector((state) => state.subTasks.SubTasks);
  // const selectedSubTask = useSelector((state) => state.tasks.selectedSubTask);

  const [subtasks, setSubTasks] = useState([]);
  const dispatch = useDispatch();
  const [titreTask, setTitreTask] = useState("");

  // titreTask
  // "Subtask 62"
  // statusTask
  // "To Do"
  // categorie
  // "SubTask"
  // relatedTaskId
  useEffect(() => {
    setTitreTask("");
    setSubTasks(subtasksList);
    console.log("subtasks");
    console.log(subtasks);
    console.log("subtasks");
  }, [subtasksList]);

  const handleClick = async () => {
    if (titreTask !== "") {
      let subtask = {
        titreTask: titreTask,
        statusTask: "To Do",
        categorie: "SubTask",
      };
      console.log(12);
      if (state_A_E === "add") {
        dispatch(addSubTask(subtask));
      } else {
        console.log(1);

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userObject = JSON.parse(storedUser);
          const userId = userObject.user._id;
          const token = userObject.token;
          const response = await fetch(
            `http://localhost:3002/task/createSubTask/${selectedTask._id}`,
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
            throw new Error("Failed to fetch tasks.");
          }

          const data = await response.json();
          console.log(data.subtask);

          dispatch(addSubTask(data));
        }
      }
    }
  };

  return (
    <div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new ToDo..."
          value={titreTask}
          onChange={(e) => {
            setTitreTask(e.target.value);
          }}
        />
        <button className="add-btn" onClick={handleClick}>
          <span className="material-symbols-outlined">add_circle</span>
          <p> Add</p>
        </button>
      </div>
      <div className="subtasks-list">
        {subtasks.length > 0 ? (
          subtasks.map((subtask, index) => (
            <SubTaskDetailsComponent key={index} subTask={subtask} />
          ))
        ) : (
          <p>No subtasks added yet</p>
        )}
      </div>
    </div>
  );
}
