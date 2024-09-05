import { useState } from "react";
import "../../../styles/topTasksComponent.css";
import TaskDetailsComponent from "./TaskDetailsComponent";

export default function TopTasksComponent() {
  const [open, setOpen] = useState(false);

  const today = new Date();
  const handleClick = () => {
    setOpen(true);
  };
  const month = today.toLocaleString("en-US", { month: "long" });
  const day = today.getDate();

  return (
    <div className="top-tasks-container">
      <div className="top">
        <h1>All Tasks</h1>
        <hr />
        <div className="top-bottom-content">
          <div className="date">
            Today, {day} {month}
          </div>
          <button onClick={handleClick} className="add-btn-draft">
            <span className="material-symbols-outlined">add_circle</span>
            <p>New</p>
          </button>
          <TaskDetailsComponent
            open={open}
            onClose={() => setOpen(false)}
            task={[]}
            state="add"
          ></TaskDetailsComponent>
        </div>
      </div>
    </div>
  );
}
