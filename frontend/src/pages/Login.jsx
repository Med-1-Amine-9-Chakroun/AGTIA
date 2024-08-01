import "../styles/login.css";
export default function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-card-left">
          <h1>Login</h1>
          <div className="inputs">
            <input
              className="userNameField"
              type="text"
              placeholder="UserName"
            />
            <input
              className="passwordField"
              type="password"
              placeholder="Password"
            />
          </div>

          <button className="loginBtn">Login</button>
          <span className="error"></span>
          <div className="forgotpswd">Forgot Password! Click here!</div>
        </div>
        <div className="vertical-line"></div>
        <div className="login-card-right">
          <p>You don't have an account yet. Create one easily.</p>
          <button>Create Account</button>
        </div>
      </div>
    </div>
  );
}
