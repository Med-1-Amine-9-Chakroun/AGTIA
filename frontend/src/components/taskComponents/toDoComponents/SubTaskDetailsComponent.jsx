import React, { useState } from "react";
import "./styles/subtasks.css";
import { X } from "react-feather";

export default function SubTaskDetailsComponent({ subTask }) {
  const [checked, setChecked] = useState(subTask.statusTask === "Done");

  const handleToggle = () => {
    setChecked(!checked);
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
        <X />
      </span>
    </div>
  );
}
