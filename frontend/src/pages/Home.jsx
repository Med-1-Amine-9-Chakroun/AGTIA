import VerticalNavBar from "../components/VerticalNavBar";
import TaskComponent from "../components/taskComponents/TasksComponent";
import "../styles/home.css";
export default function Home() {
  return (
    <div className="home-container">
      <VerticalNavBar />
      <TaskComponent />
    </div>
  );
}
