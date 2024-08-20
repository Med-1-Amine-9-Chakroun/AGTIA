import VerticalNavBar from "../components/VerticalNavBar";
import TaskComponent from "../components/taskComponents/toDoComponents/TasksComponent";
import CalendarComponent from "../components/taskComponents/calendarComponents/CalendarComponent";
import "../styles/home.css";
export default function Home() {
  return (
    <div className="home-container">
      <VerticalNavBar />
      <CalendarComponent />
      {/* <TaskComponent /> */}
    </div>
  );
}
