import "../../../styles/topTasksComponent.css";
export default function TopTasksComponent() {
  const today = new Date();

  const month = today.toLocaleString("en-US", { month: "long" });
  const day = today.getDate();

  return (
    <div className="top-tasks-container">
      <div className="top">
        <h1>All Tasks</h1>
        <hr />
        <div className="top-bottom-content">
          <div className="date">
            Today, {day} {month}
          </div>
          <button>
            <span className="material-symbols-outlined">add_circle</span>
            <p>New</p>
          </button>
        </div>
      </div>
    </div>
  );
}
