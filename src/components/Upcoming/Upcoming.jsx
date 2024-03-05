import React from "react";

import "./Upcoming.css";
import { formatReleaseDate } from "../../helpers/formatReleaseDateHelper.js";

const Upcoming = ({ game }) => {
  return (
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
  );
};

export default Upcoming;
