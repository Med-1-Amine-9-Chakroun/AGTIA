import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ColumnComponent from "./ColumnComponent";
import "./styles/board.css";

export default function BottomTasksComponent() {
  const [toDo, setToDo] = useState([]);
  const [doing, setDoing] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setToDo(json.filter((task) => !task.completed));
        setDone(json.filter((task) => task.completed));
      });
  }, []);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    deletePreviousState(source.droppableId, draggableId);

    const task = findItemById(draggableId, [...toDo, ...doing, ...done]);

    setNewState(destination.droppableId, task);
  };

  function deletePreviousState(sourceDroppableId, taskId) {
    switch (sourceDroppableId) {
      case "1":
        setToDo(removeItemById(taskId, toDo));
        break;
      case "2":
        setDoing(removeItemById(taskId, doing));
        break;
      case "3":
        setDone(removeItemById(taskId, done));
        break;
    }
  }

  function setNewState(destinationDroppableId, task) {
    let updatedTask;
    switch (destinationDroppableId) {
      case "1": // TO DO
        updatedTask = { ...task, completed: false };
        setToDo([updatedTask, ...toDo]);
        break;
      case "2": // DOING
        updatedTask = { ...task, completed: false };
        setDoing([updatedTask, ...doing]);
        break;
      case "3": // DONE
        updatedTask = { ...task, completed: true };
        setDone([updatedTask, ...done]);
        break;
    }
  }

  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id != id);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="BottomTasksComponent">
        <ColumnComponent title={"TO DO"} tasks={toDo} id={"1"} />
        <ColumnComponent title={"DOING"} tasks={doing} id={"2"} />
        <ColumnComponent title={"DONE"} tasks={done} id={"3"} />
      </div>
    </DragDropContext>
  );
}
