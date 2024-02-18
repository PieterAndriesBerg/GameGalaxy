import React, { useEffect, useState } from "react";
import { getPlatformIcon } from "../../helpers/platformIconsHelper.jsx";

import "./GameCard.css";
import { fetchGameDetails } from "../../helpers/api.js";
import { formatGenres } from "../../helpers/formatGenresHelper.js";
import { formatReleaseDate } from "../../helpers/formatReleaseDateHelper.js";

const GameCard = ({ game }) => {
  const [gameDetails, setGameDetails] = useState({});

  // Delete

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGameDetails(game.id);
        setGameDetails(response);
        console.log("Game Details", response);
      } catch (error) {
        console.log("Problem Fetching Game Details", error);
      }
    };

    void fetchData();
  }, []);
  return (
    <div className="gamecard-container">
      <div className="gamecard-text-column">
        <div className="gamecard-top">
          <h3 className="game-title">{game.name}</h3>
          <div className="platforms-container">
            {getPlatformIcon(game.platforms)}
          </div>
        </div>
        <p className="gamecard-description">{gameDetails.description_raw}</p>
        <div className="detail-labels">
          <div className="gamecard-text-info">
            <span className="flex-end">Release Date:</span>
            <span className="flex-end">{formatReleaseDate(game.released)}</span>
          </div>
          <div className="gamecard-text-info">
            <span>Genres:</span>
            <span>{game.genres.length > 0 && formatGenres(game.genres)}</span>
          </div>
        </div>
      </div>
      <div className="gamecard-img-container">
        <img src={game.background_image} alt={game.name} />
      </div>
    </div>
  );
};

export default GameCard;
