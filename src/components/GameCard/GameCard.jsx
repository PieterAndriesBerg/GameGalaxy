import React from "react";
import { getPlatformIcon } from "../../helpers/platformIconsHelper.jsx";

import "./GameCard.css";

const GameCard = () => {
  //TODO: Change Dummy data with the fetched api data

  return (
    <div className="gamecard-container">
      <div className="gamecard-text-column">
        <div className="gamecard-top">
          <h3 className="game-title">Just Cause</h3>
          <span className="gamecard-platforms">{getPlatformIcon("Xbox")}</span>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta
          eligendi natus quam recusandae voluptatum. A accusamus animi dolores
          rem sequi unde! Amet architecto commodi ex hic labore necessitatibus.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta
          eligendi natus quam recusandae voluptatum. A accusamus animi dolores
          rem sequi unde! Amet architecto commodi ex hic labore necessitatibus.
        </p>
        <div className="detail-labels">
          <div className="gamecard-text-info">
            <span className="flex-end">Release Date:</span>
            <span className="flex-end">Jan, 18, 2024</span>
          </div>
          <div className="gamecard-text-info">
            <span>Genres:</span>
            <span>Adventure, Action, RPG</span>
          </div>
        </div>
      </div>
      <img
        src="src/assets/Grand_Theft_Auto_V.png"
        alt="gta-v"
        className="gamecard-img"
      />
    </div>
  );
};

export default GameCard;
