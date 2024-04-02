import React from "react";
import { getPlatformIcon } from "../../helpers/platformIconsHelper.jsx";
import "./GameCard.css";
import { formatGenres } from "../../helpers/formatGenresHelper.js";
import { formatReleaseDate } from "../../helpers/formatReleaseDateHelper.js";
import { Link } from "react-router-dom";

const GameCard = ({ game, className }) => {
  // if (isLoading) {
  //   return <Loading className="loading-component" />;
  // }

  const key = `${game.id}-${game["platforms"]
    .map((platform) => platform.platform.name)
    .join("-")}`;

  return (
    <Link to={{ pathname: `/games/${game.id}`, state: { game } }}>
      <div className={`gamecard-container`}>
        <div className="gamecard-text-column">
          <div className="gamecard-top">
            <h3 className="game-title">{game.name}</h3>
            <div className="platforms-container" key={key}>
              {getPlatformIcon(game["platforms"])}
            </div>
          </div>
          <p className="gamecard-description">
            Click to get more info about the game!
          </p>
          <div className="detail-labels">
            <div className="gamecard-text-info">
              <span className="flex-end">Release Date:</span>
              <span className="flex-end">
                {formatReleaseDate(game.released)}
              </span>
            </div>
            <div className="gamecard-text-info">
              <span>Genres:</span>
              <span>
                {game["genres"].length > 0 && formatGenres(game["genres"])}
              </span>
            </div>
          </div>
        </div>
        <div className="gamecard-img-container">
          <img src={game["background_image"]} alt={game.name} />
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
