import React, { useState } from "react";
import "./styles/subtasks.css";
import { X } from "react-feather";
export default function SubTaskDetailsComponent() {
  const [checked, setChecked] = useState(true);

  const handleToggle = () => {
    setChecked(!checked);
  };

  return (
    <div
      className={`checkbox-text-container ${checked ? "unchecked" : "checked"}`}
      onClick={handleToggle}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
        className="hidden-checkbox"
      />
      <span className="custom-checkbox"></span>
      <span className="text">Lorem ipsum dolor sit amet.</span>
      <span className="close-icon">
        <X />
      </span>
    </div>
  );
}
