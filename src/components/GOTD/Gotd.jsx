import React from "react";
import "./Gotd.css";
import { getPlatformIcon } from "../../helpers/platformIconsHelper.jsx";
import { formatGenres } from "../../helpers/formatGenresHelper.js";
import StarRating from "../StarRating/StarRating.jsx";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading.jsx";
import FavoriteIcon from "../FavoriteIcon/FavoriteIcon.jsx";

const Gotd = ({ game }) => {
  console.log("GOTD", game);

  if (!game) {
    return <Loading />;
  }

  return (
    <div className="gotd-container">
      <div className="gotd-image-container">
        <img
          src={game["background_image"]}
          alt={game.name}
          className="gotd-image"
        />
        <div className="favorite-icon-container">
          <FavoriteIcon gameId={game.id} iconSize="3x" />
        </div>
      </div>
      <div className="gotd-container-info">
        <span className="gotd-info-platforms">
          {getPlatformIcon(game["platforms"])}
        </span>
        <Link to={{ pathname: `/games/${game.id}`, state: { game } }}>
          <h2>{game.name}</h2>
          <p className="gotd-description">{game["description_raw"]}</p>
        </Link>
        <div className="gotd-ratings">
          {game["ratings"] && game["ratings"].length > 0 && (
            <div>
              <p>{game["ratings"][0].title}</p>
              <StarRating ratingTitle={game["ratings"][0].title} />
            </div>
          )}
          <span>{game["ratings_count"]} RATINGS</span>
        </div>
        {game["developers"] && game["developers"].length > 0 ? (
          <div className="gotd-info-bottom">
            <p>Developer:</p>
            <span>{game["developers"][0].name}</span>
          </div>
        ) : null}
        <div className="gotd-info-bottom">
          <p>Release Date:</p>
          <span>{game["released"] == null ? "TBA" : game["released"]}</span>
        </div>
        <div className="gotd-info-bottom">
          <p>Genres:</p>
          <span>
            {game["genres"] &&
              game["genres"].length > 0 &&
              formatGenres(game["genres"])}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Gotd;
