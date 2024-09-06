import "./styles/topTasksComponent.css";
import TaskDetailsComponent from "../taskComponents/toDoComponents/TaskDetailsComponent";
import { useState } from "react";
export default function TopCalendarComponent() {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const handleClick = () => {
    setOpen(true);
  };
  const month = today.toLocaleString("en-US", { month: "long" });
  const day = today.getDate();

  return (
    <div className="top-calendar-container">
      <div className="top">
        <h1>Calendar</h1>
        <hr />
        <div className="top-bottom-content">
          <div className="date">
            Today, {day} {month}
          </div>
          <button onClick={handleClick} className="add-task">
            <span className="material-symbols-outlined">add_circle</span>
            <p>New</p>
          </button>
        </div>
        <TaskDetailsComponent
          open={open}
          onClose={() => setOpen(false)}
          task={[]}
          state="add"
        ></TaskDetailsComponent>
      </div>
    </div>
  );
}
