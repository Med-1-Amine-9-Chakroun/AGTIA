import React, { useEffect, useState } from "react";
import "./styles/modal.css";
import { X } from "react-feather";
import "./styles/taskDetails.css";
import SubTasksComponent from "./SubTasksComponent";
export default function TaskDetailsComponent({ open, onClose, taskId }) {
  const [subTasks, setSubTasks] = useState([]);
  const [task, setTask] = useState([]);

  // const getSubtasks = async (idTask) => {
  //   try {
  //     const storedUser = localStorage.getItem("user");
  //     if (storedUser) {
  //       const userObject = JSON.parse(storedUser); // Parse the JSON string into an object

  //       // Access the token from the parsed object

  //       const token = userObject.token;
  //       const response = await fetch(
  //         `http://localhost:3002/task/getSubTasks/${idTask}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       // Check if the response status is OK (200)
  //       if (!response.ok) {
  //         console.error("Error:", response.status, response.statusText);
  //         const errorText = await response.text();
  //         console.error("Response Text:", errorText);
  //         throw new Error("Failed to fetch tasks.");
  //       }
  //       const data = await response.json();
  //       console.log(data);
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };
  /***************************************************************** */
  /***************************************************************** */
  /***************************************************************** */
  const getTasksData = async (taskId) => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userObject = JSON.parse(storedUser); // Parse the JSON string into an object
        console.log(taskId);

        const token = userObject.token;
        const response = await fetch(
          `http://localhost:3002/task/getTask/${taskId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(444);
        // Check if the response status is OK (200)
        if (!response.ok) {
          console.error("Error:", response.status, response.statusText);
          const errorText = await response.text();
          console.error("Response Text:", errorText);
          throw new Error("Failed to fetch tasks.");
        }
        const taskData = await response.json();
        console.log(taskData);
        return taskData;
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  useEffect(() => {
    console.log(222);

    // getTasksData(taskId);
    console.log(555);

    // getSubtasks(task._id);
  }, []);
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`modal-backdrop ${open ? "visible" : "invisible"}`}
    >
      {/* modal */}
      <div
        style={{ width: "65%" }}
        onClick={(e) => e.stopPropagation()}
        className={`modal-content ${open ? "open" : ""}`}
      >
        <button onClick={onClose} className="close-button">
          <X />
        </button>
        <h1>Task Details</h1>
        <div className="modal-container">
          <div className="modal-container-left">
            <input type="text" className="titleInput" />
            <textarea name="" id=""></textarea>
            <span className="status">To Do</span>
            <label htmlFor="">
              <p>Start date:</p>

              <input type="date" />
            </label>
            <label htmlFor="">
              <p>End date:</p>

              <input type="date" />
            </label>
            <label htmlFor="">
              <p>Start time:</p>

              <input type="time" />
            </label>
            <label htmlFor="">
              <p>End time:</p>

              <input type="time" />
            </label>
            <hr />
            <div className="bottom-data">
              <label htmlFor="">
                <p>Priority:</p>
                <select name="" id=""></select>
              </label>
              <label htmlFor="">
                <p>Type:</p>

                <input type="text" />
              </label>
            </div>

            <span className="buttons">
              <button className="delete-btn">Delete</button>
              <button className="save-btn">Save</button>
            </span>
          </div>
          <div className="modal-container-right">
            <SubTasksComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
