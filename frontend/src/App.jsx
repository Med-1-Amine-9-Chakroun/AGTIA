import "./App.css";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import SignIn from "./components/SignIn";

function App() {
  return (
    <div className="App">
      <NavBar />
      <SignIn />
      {/* <Login /> */}
    </div>
  );
}

export default App;
