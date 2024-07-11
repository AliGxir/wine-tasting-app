import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// details page doesn't have anyone passing props directly, render by the router directly
// parent route, APP can funnel via oulet, but can't give detail of one of them, so fetch current data obj and update via state
// useEffect use useState in tandem to display data
// if condition if don't have data yet, place above the destructured variable

const WineDetail = () => {
  const [wine, setWine] = useState(null);
  const { wineId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/wines/${wineId}`)
      .then((resp) => {
        if (!resp.ok) {
          console.error("Failed to fetch");
        } else {
          resp.json().then(setWine);
        }
      })
      .catch((error) => console.log(error.message));
  }, []);

  if (!wine) {
    return <h2>Loading...</h2>;
  }
  const { name, price, region, rating, tastingNotes, image } = wine;

  return (
    <li className="card" data-testid="wine-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: ${price}</p>
      <p>Region: {region}</p>
      <p>Rating: {rating}</p>
      <p>Tasting Notes: {tastingNotes}</p>
    </li>
  );
};

export default WineDetail;
