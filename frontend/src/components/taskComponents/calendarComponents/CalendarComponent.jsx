import React from "react";
import TopCalendarComponent from "./TopCalendarComponent";
import BottomCalendarComponent from "./BottomCalendarComponent";
import "./styles/bottomCalendar.css";
export default function CalendarComponent() {
  return (
    <div className="calendar-component">
      <TopCalendarComponent />
      <BottomCalendarComponent />
    </div>
  );
}
