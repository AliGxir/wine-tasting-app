import { useState } from "react";

const Wine = ({id, name, price, image, handleDelete}) => {
    const [like, setLike] = useState(true)

    const handleLike = () => setLike(!setLike)

    return (
        <li className="card" data-testid="wine-item">
        <img src={image} alt={name} />
        <h4>{name}</h4>
        <p>Price: {price}</p>
        {like ? (
          <button onClick={handleLike} className="primary">Add To My Favorites 🩷</button>
        ) : (
          <button onClick={handleLike}>Remove From My Favorites 💔</button>
        )}
        <button onClick={() => handleDelete(id)}>Delete</button>
      </li>
    )
}

export default Wine;