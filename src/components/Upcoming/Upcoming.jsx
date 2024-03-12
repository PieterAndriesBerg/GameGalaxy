import React from "react";

import "./Upcoming.css";
import { formatReleaseDate } from "../../helpers/formatReleaseDateHelper.js";
import { Link } from "react-router-dom";

const Upcoming = ({ game }) => {
  return (
    <Link to={`/games/${game.id}`}>
      <div className="upcoming-container">
        <div className="upcoming-game-container">
          <h3>{game.name}</h3>
          <div>
            <p>Release Date:</p>
            <p>{formatReleaseDate(game.released)}</p>
          </div>
          <img src={game["background_image"]} alt="ERR" />
        </div>
      </div>
    </Link>
  );
};

export default Upcoming;
