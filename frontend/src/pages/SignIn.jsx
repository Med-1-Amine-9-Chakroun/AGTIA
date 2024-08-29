import { Link } from "react-router-dom";
import "../styles/signin.css";
export default function SignIn() {
  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-card-left">
          <h1>Sign In</h1>
          <div className="inputs">
            <input
              className="firstNameField"
              type="text"
              placeholder="First Name"
            />
            <input
              className="lastNameField"
              type="text"
              placeholder="Last Name"
            />
            <input
              className="emailField"
              type="email"
              placeholder="Email Address"
            />
            <input
              className="passwordField"
              type="password"
              placeholder="Password"
            />
            <input
              className="confirmPasswordField"
              type="password"
              placeholder="Confirm Password"
            />
          </div>

          <button className="signinBtn">Create Account</button>
          <span className="error"></span>
        </div>
        <div className="vertical-line"></div>
        <div className="signin-card-right">
          <p>You already have an account.</p>
          <Link to="/">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
