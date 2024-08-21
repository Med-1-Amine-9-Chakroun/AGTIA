import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // for dateClick
import listPlugin from "@fullcalendar/list";
import "./styles/bottomCalendar.css";

export default function BottomCalendarComponent() {
  // we must get tasks and verifey the state to affect the class name of the border left
  // we must only show to do and doing tasks and not show done tasks
  const events = [
    {
      id: 552,
      title: "All Day Event",
      start: "2018-03-01",
      className: "borderleftDoing",
    },
    {
      id: 551,
      title: "Long Event",
      start: "2018-03-07",
      end: "2018-03-10",
      className: "borderleftToDo",
    },
    {
      id: 505,
      title: "Repeating Event",
      start: "2018-03-09",
      className: "borderleftDoing",
    },
    {
      id: 515,
      title: "Repeating Event",
      start: "2018-03-16",
      className: "borderleftToDo",
    },
    {
      id: 525,
      title: "Conference",
      start: "2018-03-11",
      end: "2018-03-13",
      className: "borderleftDoing",
    },
    {
      id: 535,
      title: "Meeting",
      start: "2018-03-12",
      end: "2018-03-12",
      className: "borderleftDone",
    },
    {
      id: 545,
      title: "Lunch",
      start: "2018-03-12",
      className: "borderleftToDo",
    },
    {
      id: 555,
      title: "Meeting",
      start: "2018-03-12",
      className: "borderleftDone",
    },
    {
      id: 565,
      title: "Happy Hour",
      start: "2018-03-16",
      className: "borderleftDoing",
    },
    {
      id: 575,
      title: "Dinner",
      start: "2018-03-14",
      className: "borderleftDone",
    },
    {
      id: 585,
      title: "Birthday Party",
      start: "2018-03-12",
      className: "borderleftDoing",
    },
  ];

  const handleEventClick = (clickInfo) => {
    alert(`Task ID: ${clickInfo.event.id}`);
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
          initialDate="2018-03-12"
          navLinks={false} // can click day/week names to navigate views
          editable={false}
          events={events}
          dayHeaderFormat={{ weekday: "long" }} // Use 'long' for full day names
          contentHeight={600} // Adjust content height as needed
          eventClick={handleEventClick} // Handle click on event
        />
      </div>
    </div>
  );
}
