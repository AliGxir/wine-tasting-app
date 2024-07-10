import Wine from "./Wine";
import SearchBar from "./SearchBar";
import { useOutletContext, useLocation } from "react-router-dom";
import { useState } from "react";

const Wines = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { wines, handleLike, favWines } = useOutletContext();
  const location = useLocation();
  console.log(location);
  const winesDisplay = location.pathname === "/wines" ? wines : favWines;
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const finalWines = winesDisplay
    .filter((wine) => {
      return wine.name.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .map((wine) => (
      <Wine
        className="wine-container"
        key={wine.id}
        isLiked={favWines.find((wineObj) => wine.id === wineObj.id)}
        {...wine}
        handleLike={handleLike}
      />
    ));

  return (
    <main>
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      <ul className="cards">{finalWines}</ul>
    </main>
  );
};

export default Wines;
