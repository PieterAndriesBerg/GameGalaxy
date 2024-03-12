// Create a Genre Card component that will display the genre name and the number of games in the genre from rawg.io

import React from "react";
import "./GenreCard.css";

const GenreCard = ({ genre, onClick }) => {
  return (
    <div className="genres-card" onClick={onClick}>
      <h3>{genre.name}</h3>
      <p>Games: {genre["games_count"]}</p>
    </div>
  );
};

export default GenreCard;
