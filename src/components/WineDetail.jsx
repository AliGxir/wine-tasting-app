import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const WineDetail = () => {
  const [wine, setWine] = useState(null);
  const { wineId } = useParams();
  console.log(wineId)
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
