import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Avatar } from "antd";
import "./styles/card.css";
import { format } from "date-fns";

import TaskDetailsComponent from "./TaskDetailsComponent";

export default function CardComponent({ task, index, id }) {
  const [open, setOpen] = useState(false);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return format(date, "dd-MM-yyyy");
  }

  const handleClick = (snapshot) => {
    if (!snapshot.isDragging) {
      setOpen(true);

      console.log(task);

      console.log("Card clicked, open state:", open);
    }
  };
  const titleClass =
    id === "1"
      ? "titleToDo"
      : id === "2"
      ? "titleDoing"
      : id === "3"
      ? "titleDone"
      : "card";
  return (
    <div>
      <Draggable draggableId={`${task._id}`} key={task._id} index={index}>
        {(provided, snapshot) => (
          <div
            className="card"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging ? "true" : undefined}
            onClick={() => {
              handleClick(snapshot);
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 2,
              }}
            >
              <span className={titleClass}>
                {/* <small>{task.id}</small> */}
                {task.type}
              </span>
              <div className="date">
                <span className="material-symbols-outlined">schedule</span>
                {formatDate(task.startDate)}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "start" }}>
              <div className="taskDescription">{task.titreTask}</div>
            </div>
            <div className="toDoCounter">
              Subtasks: <span className="number">{task.subtasks.length}</span>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
      <TaskDetailsComponent
        open={open}
        onClose={() => setOpen(false)}
        task={task}
      ></TaskDetailsComponent>
    </div>
  );
}
