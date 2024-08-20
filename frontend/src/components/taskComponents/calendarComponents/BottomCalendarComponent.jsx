import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // for dateClick
import listPlugin from "@fullcalendar/list";
import "./styles/bottomCalendar.css";

export default function BottomCalendarComponent() {
  const events = [
    { title: "All Day Event", start: "2018-03-01" },
    { title: "Long Event", start: "2018-03-07", end: "2018-03-10" },
    { id: 55, title: "Repeating Event", start: "2018-03-09" },
    { id: 55, title: "Repeating Event", start: "2018-03-16" },
    { title: "Conference", start: "2018-03-11", end: "2018-03-13" },
    {
      title: "Meeting",
      start: "2018-03-12",
      end: "2018-03-12",
    },
    { title: "Lunch", start: "2018-03-12" },
    { title: "Meeting", start: "2018-03-12" },
    { title: "Happy Hour", start: "2018-03-16" },
    { title: "Dinner", start: "2018-03-14" },
    { title: "Birthday Party", start: "2018-03-12" },
    {
      title: "Click for Google",
      url: "http://google.com/",
      start: "2018-03-28",
    },
  ];

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
        />
      </div>
    </div>
  );
}
