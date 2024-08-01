import "./App.css";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";

import TasksComponent from "./components/taskComponents/TasksComponent";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <NavBar />

      <Home />
      {/* <SignIn /> */}
      {/* <Login /> */}
    </div>
  );
}

export default App;
