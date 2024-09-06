import "../styles/VerticalNavBar.css";
import { Link } from "react-router-dom";

export default function VerticalNavBar() {
  return (
    <div className="vertical-navbar-container">
      <h2>MENU</h2>
      <ul>
        <li>
          <Link to="/home/dashboard">
            <span className="material-symbols-outlined">grid_view</span>
            <p>Dashboard</p>
          </Link>
        </li>
        <li>
          <Link to="/home/calendar">
            <span className="material-symbols-outlined">calendar_today</span>
            <p>Calendar</p>
          </Link>
        </li>
        <li>
          <Link to="/home/tasks">
            <span className="material-symbols-outlined">list</span>
            <p>All Tasks</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}
