import React from "react";

import "./DeveloperBox.css";

const DeveloperBox = ({ developer }) => {
  return (
    <div className="developer-box">
      <h2>{developer.name}</h2>
      <ul>
        {developer.games.slice(0, 3).map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DeveloperBox;
