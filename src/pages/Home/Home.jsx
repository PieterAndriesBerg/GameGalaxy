import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Header from "../../components/Header/Header.jsx";
import "../general-page-style.css";
import { fetchPopularGames } from "../../helpers/api.js";
import GameCard from "../../components/GameCard/GameCard.jsx";

const Home = () => {
  const [popularGames, setPopularGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popular = await fetchPopularGames();
        setPopularGames(popular.results);
        console.log(popular.results);
      } catch (error) {
        console.error("Error Fetching popular games:", error);
      }
    };

    void fetchData();
  }, []);

  return (
    <>
      <div className="flex-container">
        <NavBar />
        <Header />
        <GameCard />
      </div>
    </>
  );
};

export default Home;
