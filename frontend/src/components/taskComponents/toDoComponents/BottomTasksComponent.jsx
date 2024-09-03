import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ColumnComponent from "./ColumnComponent";
import "./styles/board.css";
import { useSelector } from "react-redux";

export default function BottomTasksComponent() {
  const [toDo, setToDo] = useState([]);
  const [doing, setDoing] = useState([]);
  const [done, setDone] = useState([]);

  const state = useSelector((state) => state.user.value);

  const updateTask = async (task, status) => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userObject = JSON.parse(storedUser);
        const token = userObject.token;
        task.statusTask = status;
        const response = await fetch(
          `http://localhost:3002/task/updateTask/${task._id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json", // Add this header
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(task),
          }
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getTasks = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userObject = JSON.parse(storedUser); // Parse the JSON string into an object

        // Access the token from the parsed object
        const userId = userObject.user._id;
        const token = userObject.token;
        const response = await fetch(
          `http://localhost:3002/task/allTasks/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Check if the response status is OK (200)
        if (!response.ok) {
          console.error("Error:", response.status, response.statusText);
          const errorText = await response.text();
          console.error("Response Text:", errorText);
          throw new Error("Failed to fetch tasks.");
        }

        const data = await response.json();
        console.log("Tasks Data:", data);
        console.log("Tasks Data:", data.tasks[0].statusTask);
        setToDo(data.tasks.filter((task) => task.statusTask === "To Do"));
        setDone(data.tasks.filter((task) => task.statusTask === "Done"));
        setDoing(data.tasks.filter((task) => task.statusTask === "Doing"));
        console.log(toDo);
        console.log(doing);
        console.log(done);

        const response1 = await fetch(
          `http://localhost:3002/task/getSubTasks/${idTask}`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const dataSubTasks = await response1.json();
        alert(dataSubTasks);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  useEffect(() => {
    getTasks();
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
        console.log(task._id);

        updateTask(task, "To Do");
        break;
      case "2": // DOING
        updatedTask = { ...task, completed: false };
        setDoing([updatedTask, ...doing]);
        updateTask(task, "Doing");
        break;
      case "3": // DONE
        updatedTask = { ...task, completed: true };
        setDone([updatedTask, ...done]);
        updateTask(task, "Done");
        break;
    }
  }

  function findItemById(id, array) {
    return array.find((item) => item._id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item._id != id);
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
