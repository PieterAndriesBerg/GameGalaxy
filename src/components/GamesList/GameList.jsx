// src/components/GameList/GameList.jsx

import React from "react";
import GameCard from "../GameCard/GameCard";
import "./GameList.css";

const GameList = ({ games }) => {
  console.log("GAMELIST:", games);
  return (
    <div className="game-list">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GameList;
