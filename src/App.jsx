import { useState, useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Header from "./components/navigation/Header";
import Hero from "./components/Hero";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [wines, setWines] = useState([]);
  const [favWines, setFavWines] = useState([]);

  const toggleDarkMode = () => setIsDarkMode((current) => !current);

  useEffect(() => { // used for side effects like fetch data in sync w/rendering cycle
    (() => {
      fetch("http://localhost:3000/wines")
        .then((resp) => resp.json())
        .then((wines) => setWines(wines))
        .catch((err) => toast.error(`${err.name}: ${err.message}`));
    })();
  }, []);

  useEffect(() => { // clean up fxn undo effect, invoked on every rendering, anynomous fxn returned at bottom of first arugment of the useEffect fxn
    (() => {
      fetch("http://localhost:3000/favorites")
        .then((resp) => resp.json())
        .then((wines) => setFavWines(wines))
        .catch((err) => toast.error(`${err.name}: ${err.message}`));
    })();
  }, []);

  const handleLike = (wineObj) => {
    const isLiked = favWines.find((wine) => {
      return wine.id === wineObj.id;
    });
    const url = "http://localhost:3000/favorites";
    const method = isLiked ? "DELETE" : "POST";
    const finalUrl = isLiked ? url + `/${wineObj.id}` : url;

    const configPostObj = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wineObj),
    };

    fetch(finalUrl, isLiked ? { method } : configPostObj)
      .then((resp) => {
        if (!resp.ok) {
          console.error("Failed to update favorite status");
        } else if (resp.status === 201) {
          resp.json().then((createdWine) => {
            return setFavWines((current) => [...current, createdWine]);
          });
        } else {
          setFavWines((current) =>
            current.filter((wine) => {
              return wine.id !== wineObj.id;
            })
          );
        }
      })
      .catch((err) => toast.error(`${err.name}: ${err.message}`));
  };

  const handleAddWine = (newWine) => {
    return setWines((current) => [...current, newWine]);
  };

  return (
    <div className={isDarkMode ? "App" : "App light"}>
      <div id="toast-notification">
        <Toaster />
      </div>
      <Header isDarMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      <Outlet context={{ wines, handleLike, favWines, handleAddWine }} />
      {/* only contains information*/}
    </div>
  );
};

export default App;
