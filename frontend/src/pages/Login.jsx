import { useState } from "react";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/features/user";
export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3002/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: name, password: password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch(
        login({
          id: user.user._id,
          email: user.user.email,
          nom: user.user.nomUser,
          prenom: user.user.prenomUser,
        })
      );

      // update the auth context
      navigate("/home/tasks");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <form className="login-card-left" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="inputs">
            <input
              className="userNameField"
              type="text"
              placeholder="UserName"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="passwordField"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button className="loginBtn">Login</button>
          <span className="error"></span>
          <div className="forgotpswd">Forgot Password! Click here!</div>
        </form>
        <div className="vertical-line"></div>
        <div className="sign-in">
          <p>You don't have an account yet. Create one easily.</p>
          <Link to="/sign-in">
            <button>Create Account</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
