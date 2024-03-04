import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Header from "../../components/Header/Header.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import {
  fetchNewReleases,
  fetchPopularGames,
  fetchTopRatedGames,
  fetchUpcomingGames,
} from "../../helpers/api.js";
import SlickCarousel from "../../components/SlickCarousel/SlickCarousel.jsx";

import "./Home.css";
import Upcoming from "../../components/Upcoming/Upcoming.jsx";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [popularGames, setPopularGames] = useState([]);
  const [newReleasesGames, setNewReleasesGames] = useState([]);
  const [topRatedGames, setTopRatedGames] = useState([]);
  const [upcomingGames, setUpcomingGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popular = await fetchPopularGames();
        if (popular) {
          setPopularGames(popular.results);
        }

        const newReleases = await fetchNewReleases();
        if (newReleases) {
          setNewReleasesGames(newReleases.results);
        }
        const topRated = await fetchTopRatedGames();
        if (topRated) {
          setTopRatedGames(topRated.results);
        }

        const upcoming = await fetchUpcomingGames();
        if (upcoming) {
          setUpcomingGames(upcoming);
          console.log(upcomingGames);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error Fetching Data in home.jsx", error);
      }
    };

    void fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading className="loading-component" />
      ) : (
        <>
          <div className="flex-container-row">
            <NavBar />

            <div className="flex-container-column">
              <Header />

              <div className="flex-container-row">
                <div className="flex-container-column">
                  <h2 className="carousel-title">Popular</h2>
                  <SlickCarousel
                    games={popularGames && popularGames}
                    className="game-slider"
                  />
                  <h2 className="carousel-title">New Releases</h2>
                  <SlickCarousel
                    games={newReleasesGames && newReleasesGames}
                    className="game-slider"
                  />
                  <h2 className="carousel-title">Top Rated</h2>
                  <SlickCarousel
                    games={topRatedGames && topRatedGames}
                    className="game-slider"
                  />
                </div>
                <div className="flex-container-column right">
                  <h2>Upcoming</h2>
                  {upcomingGames.map((game) => {
                    return <Upcoming game={game && game} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
