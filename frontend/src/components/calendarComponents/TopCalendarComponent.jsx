import "./styles/topTasksComponent.css";
export default function TopCalendarComponent() {
  const today = new Date();

  const month = today.toLocaleString("en-US", { month: "long" });
  const day = today.getDate();

  return (
    <div className="top-calendar-container">
      <div className="top">
        <h1>Calendar</h1>
        <hr />
        <div className="top-bottom-content">
          <div className="date">
            Today, {day} {month}
          </div>
          <button>
            <span class="material-symbols-outlined">add_circle</span>
            <p>New</p>
          </button>
        </div>
      </div>
    </div>
  );
}