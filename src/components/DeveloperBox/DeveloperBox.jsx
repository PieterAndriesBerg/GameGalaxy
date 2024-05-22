import React from "react";
import { useNavigate } from "react-router-dom";

import "./DeveloperBox.css";

const DeveloperBox = ({ developer }) => {
  const navigate = useNavigate();
  const goToGameDetailsPage = (gameId) => {
    navigate(`/games/${gameId}`);
  };

  return (
    <div className="developer-box">
      <h2>{developer.name}</h2>
      <ul>
        {developer.games.slice(0, 3).map((game) => (
          <a key={game.id} onClick={() => goToGameDetailsPage(game.id)}>
            {game.name}
          </a>
        ))}
      </ul>
    </div>
  );
};

export default DeveloperBox;
