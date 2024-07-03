import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Header from "../../components/Header/Header.jsx";
import { useAuth } from "../../context/AuthProvider.jsx";
import {
  getGenreFromMood,
  moodToGenreMap,
} from "../../helpers/moodToGenresMapper.js";
import { fetchGamesByGenre } from "../../helpers/api.js";
import GameCard from "../../components/GameCard/GameCard.jsx";

import "./Mood.css";

const Mood = () => {
  const [mood, setMood] = useState("");
  const { user } = useAuth();
  const [game, setGame] = useState();

  const handleMoodChange = (event) => {
    setMood(event.target.value);
  };

  const handleMoodSubmit = async () => {
    try {
      console.log("Mood submitted:", mood);
      const genre = getGenreFromMood(mood);
      console.log("Genre:", genre);
      const games = await fetchGamesByGenre(genre);
      if (games.length > 0) {
        const randomIndex = Math.floor(Math.random() * games.length);
        const randomGame = games[randomIndex];
        setGame(randomGame);
      } else {
        console.log(`No games found for genre: ${genre.name}`);
      }
    } catch (error) {
      console.error("Error fetching games by genre:", error);
    }
  };

  return (
    <div className="mood-flex-container">
      <NavBar />
      <div className="mood-flex-column">
        <Header />
        <div className="mood-content-container">
          <h1>Hey {user?.username}, how are you feeling today?</h1>
          <select value={mood} onChange={handleMoodChange}>
            {Object.keys(moodToGenreMap).map((mood) => (
              <option key={mood} value={mood}>
                {mood}
              </option>
            ))}
          </select>
          <button onClick={handleMoodSubmit}>Submit</button>
          {game && <GameCard game={game} />}
        </div>
      </div>
    </div>
  );
};

export default Mood;
