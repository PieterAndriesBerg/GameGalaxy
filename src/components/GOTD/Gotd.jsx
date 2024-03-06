import React from "react";
import "./Gotd.css";
import { getPlatformIcon } from "../../helpers/platformIconsHelper.jsx";
import { formatGenres } from "../../helpers/formatGenresHelper.js";
import StarRating from "../StarRating/StarRating.jsx";

const Gotd = ({ game }) => {
  console.log("GOTD", game);
  return (
    <div className="gotd-container">
      <div className="gotd-image-container">
        <img
          src={game["background_image"]}
          alt={game.name}
          className="gotd-image"
        />
      </div>
      <div className="gotd-container-info">
        <span className="gotd-info-platforms">
          {getPlatformIcon(game["platforms"])}
        </span>
        <h2>{game.name}</h2>
        <p className="gotd-description">{game["description_raw"]}</p>
        <div className="gotd-ratings">
          <div>
            <p>{game["ratings"][0].title}</p>
            <StarRating ratingTitle={game["ratings"][0].title} />
          </div>
          <span>{game["ratings_count"]} RATINGS</span>
        </div>
        <div className="gotd-info-bottom">
          <p>Developer:</p>
          <span>{game["developers"][0].name}</span>
        </div>
        <div className="gotd-info-bottom">
          <p>Release Date:</p>
          <span>{game["released"]}</span>
        </div>
        <div className="gotd-info-bottom">
          <p>Genres:</p>
          <span>
            {game["genres"].length > 0 && formatGenres(game["genres"])}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Gotd;
