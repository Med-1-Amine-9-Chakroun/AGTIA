import VerticalNavBar from "../components/VerticalNavBar";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TaskComponent from "../components/taskComponents/toDoComponents/TasksComponent";
import CalendarComponent from "../components/calendarComponents/CalendarComponent";
import DashboardComponent from "../components/dashboardComponents/DashboardComponent";
import "../styles/home.css";
export default function Home() {
  return (
    <Router>
      <div className="home-container">
        <VerticalNavBar />
        <div className="content-container">
          <Routes>
            <Route path="/dashboard" element={<DashboardComponent />} />
            <Route path="/calendar" element={<CalendarComponent />} />
            <Route path="/tasks" element={<TaskComponent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
