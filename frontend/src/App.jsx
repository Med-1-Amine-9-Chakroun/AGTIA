// App.js
import "./App.css";
// IMPORTATION DES COMPONENTS
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
// IMPORTATION DU ROUTER ET ...
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// IMPORTATION DU PROVIDER
import { Provider } from "react-redux";
// IMPORTATION DU STORE
import { store } from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/home/*" element={<Home />} />
            <Route path="/" element={<Login />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
