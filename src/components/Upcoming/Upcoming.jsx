import React from "react";
import "./Upcoming.css";
import { formatReleaseDate } from "../../helpers/formatReleaseDateHelper.js";
import { Link } from "react-router-dom";
import FavoriteIcon from "../FavoriteIcon/FavoriteIcon.jsx";

const Upcoming = ({ game }) => {
  return (
    <div className="upcoming-container">
      <div className="upcoming-game-container">
        <h3>{game.name}</h3>
        <Link to={{ pathname: `/games/${game.id}`, state: { game } }}>
          <div>
            <p>Release Date:</p>
            <p>{formatReleaseDate(game.released)}</p>
          </div>
        </Link>
        <div className="image-container">
          <img src={game["background_image"]} alt="ERR" />
          <div className="favorite-icon-container">
            <FavoriteIcon gameId={game.id} iconSize="2x" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
