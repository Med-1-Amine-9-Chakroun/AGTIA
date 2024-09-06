import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // for dateClick
import listPlugin from "@fullcalendar/list";
import "./styles/bottomCalendar.css";

import { selectTask } from "../../redux/features/tasks";

import { setSubTask } from "../../redux/features/subtasks";
import TaskDetailsComponent from "../taskComponents/toDoComponents/TaskDetailsComponent";

import { useDispatch, useSelector } from "react-redux";

export default function BottomCalendarComponent() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [task1, setTask1] = useState([]);
  let toDoTasks = useSelector((state) => state.tasks.toDo);
  let DoingTasks = useSelector((state) => state.tasks.doing);
  let DoneTasks = useSelector((state) => state.tasks.done);
  const selectedTask = useSelector((state) => state.tasks.selectedTask);

  const allTasks = [...toDoTasks, ...DoingTasks, ...DoneTasks];

  const today = new Date();
  const [day, setDay] = useState(today.toISOString().split("T")[0]);
  const getStatusClass = (status) => {
    switch (status) {
      case "Doing":
        return "borderleftDoing";
      case "Done":
        return "borderleftDone";
      case "To Do":
        return "borderleftToDo";
      default:
        return "";
    }
  };

  const event = allTasks.map((task) => ({
    id: task._id,
    title: task.titreTask,
    start: new Date(task.startDate).toISOString().split("T")[0],
    end: new Date(task.endDate).toISOString().split("T")[0],
    className: getStatusClass(task.statusTask), // Optional
  }));

  /********************************************** */
  /********************************************** */
  const getSubTasks = async (task) => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userObject = JSON.parse(storedUser); // Parse the JSON string into an object

        const token = userObject.token;
        console.log(task._id);

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

        dispatch(setSubTask(data.subtasks));
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  /********************************************** */
  /********************************************** */

  const handleEventClick = (clickInfo) => {
    setOpen(true);
    setTask1(allTasks.find((task) => task._id === clickInfo.event.id));

    console.log(task1);
    getSubTasks(task1);
    dispatch(selectTask(task1));
    console.log(selectedTask);
  };

  return (
    <div className="container">
      <div className="calendar-panel">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          initialView="dayGridMonth" // Default view
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          initialDate={day}
          navLinks={true} // can click day/week names to navigate views
          editable={false}
          events={event}
          dayHeaderFormat={{ weekday: "long" }} // Use 'long' for full day names
          contentHeight={620} // Adjust content height as needed
          eventClick={handleEventClick} // Handle click on event
        />
      </div>
      <TaskDetailsComponent
        open={open}
        onClose={() => setOpen(false)}
        task={task1}
        state="edit"
      ></TaskDetailsComponent>
    </div>
  );
}
