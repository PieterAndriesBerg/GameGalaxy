import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Header from "../../components/Header/Header.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import {
  fetchGameOfTheDay,
  fetchNewReleases,
  fetchPopularGames,
  fetchTopRatedGames,
  fetchUpcomingGames,
} from "../../helpers/api.js";
import SlickCarousel from "../../components/SlickCarousel/SlickCarousel.jsx";

import "./Home.css";
import Upcoming from "../../components/Upcoming/Upcoming.jsx";
import Gotd from "../../components/GOTD/Gotd.jsx";

const Home = () => {
  console.log("Home Component Rendered");
  const [loading, setLoading] = useState(true);
  const [gameData, setGameData] = useState({
    popularGames: [],
    newReleasesGames: [],
    topRatedGames: [],
    upcomingGames: [],
    gameOfTheDay: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiCalls = [
          fetchPopularGames(),
          fetchNewReleases(),
          fetchTopRatedGames(),
          fetchUpcomingGames(),
          fetchGameOfTheDay(),
        ];

        const results = await Promise.all(
          apiCalls.map((call) =>
            call.catch((e) => {
              console.error("API call failed: ", e);
              return e;
            })
          )
        );

        const [popular, newReleases, topRated, upcoming, gameOfTheDay] =
          results;

        console.log("API CALLS RESULTS:", results);

        setGameData({
          popularGames: popular.results || [],
          newReleasesGames: newReleases || [],
          topRatedGames: topRated.results || [],
          upcomingGames: upcoming || [],
          gameOfTheDay: gameOfTheDay || {},
        });

        console.log("GAME DATA:", gameData);

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
          <div className="flex-container-row-home">
            <NavBar />

            <div className="flex-container-column">
              <Header />

              <div className="flex-container-row-2">
                <div className="flex-container-column">
                  <h2 className="carousel-title">Popular</h2>
                  <SlickCarousel
                    games={
                      gameData.popularGames && gameData.popularGames.slice(0, 5)
                    }
                    className="game-slider"
                  />
                  <h2 className="carousel-title">New Releases</h2>
                  <SlickCarousel
                    games={
                      gameData.newReleasesGames &&
                      gameData.newReleasesGames.slice(0, 5)
                    }
                    className="game-slider"
                  />
                  <h2 className="carousel-title">Top Rated</h2>
                  <SlickCarousel
                    games={
                      gameData.topRatedGames &&
                      gameData.topRatedGames.slice(0, 5)
                    }
                    className="game-slider"
                  />
                </div>
                <div className="flex-container-column right">
                  <h2>Upcoming</h2>
                  {gameData.upcomingGames.map((game) => {
                    return <Upcoming game={game && game} key={game.id} />;
                  })}

                  <h2>Game Of The Day</h2>
                  <Gotd game={gameData.gameOfTheDay && gameData.gameOfTheDay} />
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
