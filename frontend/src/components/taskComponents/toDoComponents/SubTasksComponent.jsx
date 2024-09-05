import React, { useEffect, useState } from "react";
import "./styles/subtasks.css";
import SubTaskDetailsComponent from "./SubTaskDetailsComponent";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addSubTask } from "../../../redux/features/subtasks";

export default function SubTasksComponent({ state }) {
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
  }, [subtasksList]);
  const handleClick = () => {
    let subtask = {
      titreTask: titreTask,
      statusTask: "To Do",
      categorie: "SubTask",
    };
    console.log(subtask);
    setTitreTask("");
    dispatch(addSubTask(subtask));
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
