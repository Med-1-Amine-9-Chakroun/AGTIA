import "../../styles/tasksComponent.css";
import TopTasksComponent from "./TopTasksComponent";
import BottomTasksComponent from "./BottomTasksComponent";

export default function TasksComponent() {
  const today = new Date();

  const month = today.toLocaleString("en-US", { month: "long" });
  const day = today.getDate();

  return (
    <div className="tasks-container">
      <TopTasksComponent />
      <BottomTasksComponent />
    </div>
  );
}
