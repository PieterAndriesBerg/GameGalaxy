import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Header from "../../components/Header/Header.jsx";
import { fetchPopularGames } from "../../helpers/api.js";
import SlickCarousel from "../../components/SlickCarousel/SlickCarousel.jsx";

import "./Home.css";

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
      <div className="flex-container-row">
        <NavBar />

        <div className="flex-container-column">
          <Header />
          <SlickCarousel games={popularGames} className="game-slider" />
          <SlickCarousel games={popularGames} className="game-slider" />
          <SlickCarousel games={popularGames} className="game-slider" />
        </div>
      </div>
    </>
  );
};

export default Home;
