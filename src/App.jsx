import { useState, useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Header from "./components/navigation/Header";
import Footer from "./components/Footer";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [wines, setWines] = useState([]);
  const [favWines, setFavWines] = useState([]);

  const toggleDarkMode = () => setIsDarkMode((current) => !current);

  useEffect(() => {
    (() => {
      fetch("http://localhost:3000/wines")
        .then((resp) => resp.json())
        .then((wines) => setWines(wines))
        .catch((error) => toast.error(`${error.name}: ${error.message}`));
    })();
  }, []);

  useEffect(() => {
    (() => {
      fetch("http://localhost:3000/favorites")
        .then((resp) => resp.json())
        .then((wines) => setFavWines(wines))
        .catch((error) => toast.error(`${error.name}: ${error.message}`));
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
      <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      <Outlet context={{ wines, handleLike, favWines, handleAddWine }} />
      <Footer />
    </div>
  );
};

export default App;
