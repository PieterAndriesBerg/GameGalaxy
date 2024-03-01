import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Header from "../../components/Header/Header.jsx";
import { fetchNewReleases, fetchPopularGames } from "../../helpers/api.js";
import SlickCarousel from "../../components/SlickCarousel/SlickCarousel.jsx";

import "./Home.css";

const Home = () => {
  const [popularGames, setPopularGames] = useState([]);
  const [newReleasesGames, setNewReleasesGames] = useState([]);

  useEffect(() => {
    const fetchPopularData = async () => {
      try {
        const popular = await fetchPopularGames();
        setPopularGames(popular.results);
      } catch (error) {
        console.error("Error Fetching popular games:", error);
      }
    };

    const fetchNewReleasesData = async () => {
      try {
        const newReleases = await fetchNewReleases();
        if (newReleases) {
          setNewReleasesGames(newReleases);
        }
        console.log("!!NEW RELEASES:", newReleases);
      } catch (error) {
        console.error("Error fetching new releases games:", error);
      }
    };

    void fetchNewReleasesData();
    void fetchPopularData();
  }, []);

  return (
    <>
      <div className="flex-container-row">
        <NavBar />

        <div className="flex-container-column">
          <Header />

          <SlickCarousel
            games={popularGames && popularGames}
            className="game-slider"
          />
          <SlickCarousel
            games={newReleasesGames && newReleasesGames}
            className="game-slider"
          />
          {/*<SlickCarousel*/}
          {/*  games={popularGames && popularGames}*/}
          {/*  className="game-slider"*/}
          {/*/>*/}
        </div>
      </div>
    </>
  );
};

export default Home;
