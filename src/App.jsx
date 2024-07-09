import { useState, useEffect } from 'react'
import './App.css'
import { Outlet } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast'; 
import Header from "./components/navigation/Header";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [wines, setWines] = useState([]);

  const toggleDarkMode = () => setIsDarkMode(current => !current)

  useEffect(() => {
    (() => {
    fetch("http://localhost:3000/wines")
    .then(resp => resp.json())
    .then((wines) => setWines(wines))
    .catch(err => toast.error(`${err.name}: ${err.message}`))
  })()
  }, [])

  const handleDelete = () => {}

  return (
      <div className={isDarkMode ? "App" : "App light"}>
        <Toaster />
        <Header isDarMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
        <Outlet context={{wines, handleDelete}} />
      </div>
  )
}

export default App;

