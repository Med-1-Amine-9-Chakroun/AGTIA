import { useState } from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";
export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(1);
    const response = await fetch(
      `http://localhost:3002/user/login?email=${encodeURIComponent(
        name
      )}&password=${encodeURIComponent(password)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    alert(2);

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      navigate("/home");
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

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}
