import "./App.css";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import SignIn from "./components/SignIn";
import VerticalNavBar from "./components/VerticalNavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <VerticalNavBar />
      {/* <SignIn /> */}
      {/* <Login /> */}
    </div>
  );
}

export default App;
