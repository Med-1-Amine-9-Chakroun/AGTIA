import { useState } from "react";
import "../styles/navbar.css";

export default function NavBar() {
  // State to manage the theme
  const [theme, setTheme] = useState("light");

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <header>
      <div className="container">
        <div className="logo">
          <h1>AGTIA</h1>
        </div>

        <nav>
          <div className="icons-container">
            <div className={`theme-button ${theme}`} onClick={toggleTheme}>
              <span className="material-symbols-outlined">
                {theme === "light" ? "dark_mode" : "light_mode"}
              </span>
            </div>

            <div className="notifications">
              <span className="material-symbols-outlined">notifications</span>
            </div>
            <div className="user-drop-down">
              <span className="material-symbols-outlined">logout</span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
