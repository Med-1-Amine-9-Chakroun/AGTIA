import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Avatar } from "antd";
import "./styles/card.css";

export default function CardComponent({ task, index, id }) {
  const titleClass =
    id === "1"
      ? "titleToDo"
      : id === "2"
      ? "titleDoing"
      : id === "3"
      ? "titleDone"
      : "card";
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className="card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
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
              Meeting
            </span>
            <div className="date">
              <span class="material-symbols-outlined">schedule</span>
              15/02/2024
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "start" }}>
            <div className="taskDescription">{task.title}</div>
          </div>
          <div className="toDoCounter">
            To Do: <span className="number">5/10</span>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
}
