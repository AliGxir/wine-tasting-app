import { Link, NavLink } from "react-router-dom";


const Header = ({isDarkMode, onToggleDarkMode}) => {
    return (
        <header>
            <h1>
                <span className="logo">🍷</span>
                Wine Tasting Tracker
            </h1>
            <NavLink to="/wines">All Wines</NavLink>
            {/* <NavLink to="/wines/:wineid" className={({isActive}) => isActive ? "active" : ""}>New Wine</NavLink>
            <NavLink to="/wines/my-favorites" className={({isActive}) => isActive ? "active" : ""}>My Favorites</NavLink>
            <NavLink to="/wines/:id" className={({isActive}) => isActive ? "active" : ""}>Wines</NavLink> */}
            <button onClick={onToggleDarkMode}>{isDarkMode ? "Light Mode" : "Dark Mode"}</button>
        </header>
    )
}

export default Header;