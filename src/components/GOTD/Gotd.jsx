import React from "react";
import "./Gotd.css";
import { getPlatformIcon } from "../../helpers/platformIconsHelper.jsx";

const Gotd = ({ game }) => {
  return (
    <div className="gotd-container">
      <div>
        <img src={game["background_image"]} alt={game.name} />
      </div>
      <div>
        <span>{getPlatformIcon(game["platforms"])}</span>
        <h2>{game.name}</h2>
        <p>{game["description_raw"]}</p>
      </div>
    </div>
  );
};

export default Gotd;
