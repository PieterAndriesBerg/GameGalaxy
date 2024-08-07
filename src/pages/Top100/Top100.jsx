import React from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import "../general-page-style.css";
import { fetchTop100GamesOfThisYear } from "../../helpers/api.js";
import { useQuery } from "react-query";
import GameCard from "../../components/GameCard/GameCard.jsx";
import Header from "../../components/Header/Header.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import "./Top100.css";

const Top100 = () => {
  const { data: games, status } = useQuery(
    "top100GamesOfThisYear",
    fetchTop100GamesOfThisYear
  );

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="top100-flex-container">
      <NavBar />
      <div className="top-100-flex-column">
        <Header />
        <div className="top100-games-container">
          <h1>Welcome to the Top 100</h1>
          <div className="top100-gamecard-container">
            <ol>
              {games.map((game) => (
                <li>
                  <GameCard key={game.id} game={game} id="top100-gamecard" />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top100;
