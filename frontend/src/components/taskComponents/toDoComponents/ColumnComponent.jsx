import React from "react";
import styled from "styled-components";
import CardComponent from "./CardComponent";
import "./styles/scroll.css";
import "../toDoComponents/styles/column.css";
import { Droppable } from "react-beautiful-dnd";

const TaskList = styled.div`
  transistion: background-color 0.2s ease;

  flex-grow: 1;
  min-height: 100px;
`;

export default function ColumnComponent({ title, tasks, id }) {
  const squareClass =
    id === "1"
      ? "squareToDo"
      : id === "2"
      ? "squareDoing"
      : id === "3"
      ? "squareDone"
      : "square";
  return (
    <div className="column">
      <div className="columnHeader">
        <div className={squareClass}></div>
        {title} <div className="number">{tasks.length}</div>
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isdraggingover={snapshot.isdraggingover}
          >
            {tasks.map((task, index) => (
              <CardComponent key={index} index={index} task={task} id={id} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </div>
  );
}
