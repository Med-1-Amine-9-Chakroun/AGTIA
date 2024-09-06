import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Avatar } from "antd";
import "./styles/card.css";
import { format } from "date-fns";
import { selectTask } from "../../../redux/features/tasks";
import { setSubTask } from "../../../redux/features/subtasks";
import TaskDetailsComponent from "./TaskDetailsComponent";
import { useDispatch, useSelector } from "react-redux";

export default function CardComponent({ task, index, id }) {
  const [open, setOpen] = useState(false);
  const [subtasks, setsubtasks] = useState(0);

  // const { toDo, done } = useSelector((state) => state.subTasks);
  const getSubTasks = async (task) => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userObject = JSON.parse(storedUser); // Parse the JSON string into an object

        const token = userObject.token;

        // Fetch subtasks concurrently using Promise.all
        const response = await fetch(
          `http://localhost:3002/task/getSubTasks/${task._id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
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
        console.log(data);

        dispatch(setSubTask(data.subtasks));
        setsubtasks(data.subtasks.length);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const dispatch = useDispatch();
  function formatDate(dateString) {
    const date = new Date(dateString);
    return format(date, "dd-MM-yyyy");
  }

  const handleClick = (snapshot) => {
    if (!snapshot.isDragging) {
      setOpen(true);
      getSubTasks(task);
      dispatch(selectTask(task));

      // dispatch(selectSubTask(task.subtasks));

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
              Subtasks: <span className="number">{task.nbrSubTasks}</span>
              {/* Subtasks: <span className="number">{subtasks}</span> */}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
      <TaskDetailsComponent
        open={open}
        onClose={() => setOpen(false)}
        task={task}
        state="edit"
      ></TaskDetailsComponent>
    </div>
  );
}
