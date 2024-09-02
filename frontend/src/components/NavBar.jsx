import { useEffect, useState } from "react";
import "../styles/navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/user";
import { useNavigate } from "react-router-dom";
export default function NavBar() {
  // State to manage the theme
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);
  const state = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve and parse the user object from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [state]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  function handleClick() {
    dispatch(logout());
    localStorage.removeItem("user");
    console.log(state);
    // update the auth context
    navigate("/");
    setUser(null);
  }
  return (
    <header>
      <div className="container">
        <div className="logo">
          <h1>AGTIA</h1>
        </div>

        <nav>
          {user && (
            <div className="icons-container">
              <div className={`theme-button ${theme}`} onClick={toggleTheme}>
                <span className="material-symbols-outlined">
                  {theme === "light" ? "light_mode" : "dark_mode"}
                </span>
              </div>

              <div className="notifications">
                <span className="material-symbols-outlined">notifications</span>
              </div>
              <div className="user-drop-down" onClick={handleClick}>
                <span className="material-symbols-outlined">logout</span>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
