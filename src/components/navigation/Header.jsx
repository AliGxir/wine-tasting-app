import { NavLink } from "react-router-dom";

const Header = ({ isDarkMode, onToggleDarkMode }) => {
  return (
    <header>
      <h1>
        <span className="logo">🍷</span>
        Wine Tasting Tracker 🍷
      </h1>
      <NavLink to="/wines">All Wines</NavLink>
      <NavLink 
        to="/favorite-wines"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        My Favorites
      </NavLink>
      <NavLink 
       to="/wines/new" 
       className={({ isActive }) => (isActive ? "active" : "")}
      >
        Wine Form
      </NavLink>
      <button onClick={onToggleDarkMode}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

export default Header;
