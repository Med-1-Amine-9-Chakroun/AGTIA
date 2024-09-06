import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ColumnComponent from "./ColumnComponent";
import "./styles/board.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTasks, moveTask } from "../../../redux/features/tasks";

export default function BottomTasksComponent() {
  const dispatch = useDispatch();
  const { toDo, doing, done } = useSelector((state) => state.tasks);

  const getSubTasks = async (taskId, token) => {
    try {
      const response = await fetch(
        `http://localhost:3002/task/getSubTasks/${taskId}`,
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
        throw new Error("Failed to fetch subtasks.");
      }

      const data = await response.json();
      return data.subtasks.length; // Return the number of subtasks
    } catch (error) {
      console.error("An error occurred:", error);
      return 0; // Return 0 if there's an error
    }
  };
  const updateTask = async (task, status) => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userObject = JSON.parse(storedUser);
        const token = userObject.token;
        const updatedTask = { ...task, statusTask: status };
        const response = await fetch(
          `http://localhost:3002/task/updateTask/${task._id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json", // Add this header
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedTask),
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
        const userObject = JSON.parse(storedUser);
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

        if (!response.ok) {
          console.error("Error:", response.status, response.statusText);
          const errorText = await response.text();
          console.error("Response Text:", errorText);
          throw new Error("Failed to fetch tasks.");
        }

        const data = await response.json();

        // Fetch subtask counts for all tasks concurrently
        const tasksWithSubtaskCount = await Promise.all(
          data.tasks.map(async (task) => {
            const subtaskCount = await getSubTasks(task._id, token);
            return {
              ...task,
              nbrSubTasks: subtaskCount, // Add the number of subtasks
            };
          })
        );

        console.log(tasksWithSubtaskCount);

        // Dispatch the updated tasks to the Redux store
        dispatch(
          setTasks({
            toDo: tasksWithSubtaskCount.filter(
              (task) => task.statusTask === "To Do"
            ),
            doing: tasksWithSubtaskCount.filter(
              (task) => task.statusTask === "Doing"
            ),
            done: tasksWithSubtaskCount.filter(
              (task) => task.statusTask === "Done"
            ),
          })
        );
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

    // deletePreviousState(source.droppableId, draggableId);

    const task = findItemById(draggableId, [...toDo, ...doing, ...done]);

    setNewState(destination.droppableId, task);
  };

  function setNewState(destinationDroppableId, task) {
    let status = task.statusTask;
    switch (destinationDroppableId) {
      case "1": // TO DO
        if (status === "Doing") {
          dispatch(moveTask({ taskId: task._id, from: "doing", to: "toDo" }));
        } else {
          dispatch(moveTask({ taskId: task._id, from: "done", to: "toDo" }));
        }

        updateTask(task, "To Do");
        break;
      case "2": // DOING
        if (status === "Done") {
          dispatch(moveTask({ taskId: task._id, from: "done", to: "doing" }));
        } else {
          dispatch(moveTask({ taskId: task._id, from: "toDo", to: "doing" }));
        }

        updateTask(task, "Doing");
        break;
      case "3": // DONE
        if (status === "To Do") {
          dispatch(moveTask({ taskId: task._id, from: "toDo", to: "done" }));
        } else if (status === "Doing") {
          dispatch(moveTask({ taskId: task._id, from: "doing", to: "done" }));
        }

        updateTask(task, "Done");
        break;
    }
  }

  function findItemById(id, array) {
    return array.find((item) => item._id == id);
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
