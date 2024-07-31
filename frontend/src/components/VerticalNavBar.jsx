import "../styles/VerticalNavBar.css";

export default function VerticalNavBar() {
  return (
    <div className="vertical-navbar-container">
      <h2>MENU</h2>
      <ul>
        <li>
          <a href="#">
            <span class="material-symbols-outlined">grid_view</span>
            <p>Dashboard</p>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="material-symbols-outlined">calendar_today</span>
            <p>Calendar</p>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="material-symbols-outlined">list</span>
            <p>All Tasks</p>
          </a>
        </li>
      </ul>
    </div>
  );
}
