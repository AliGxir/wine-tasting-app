import { useState } from "react";

const Wine = ({id, name, price, image, handleLike, isLiked}) => {

    return (
        <li className="card" data-testid="wine-item">
        <img src={image} alt={name} />
        <h4>{name}</h4>
        <p>Price: {price}</p>
        <button onClick={() => handleLike({id, name, price, image})} className={isLiked ? "primary" : ""}>{!isLiked ? "Add To My Favorites 🩷" : "Remove From My Favorites 💔"}</button>
      </li>
    )
}

export default Wine;
