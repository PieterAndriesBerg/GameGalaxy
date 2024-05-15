import React from "react";
import { useQuery } from "react-query";
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
  // REACT QUERY DATA FETCHING
  const {
    data: popularGames,
    isLoading: popularIsLoading,
    error: popularError,
    isFetching: isFetchingPopularGames,
  } = useQuery("popularGames", fetchPopularGames(), {
    staleTime: 1000 * 60 * 12,
    cacheTime: 1000 * 60 * 60 * 5,
    retry: 1,
  });
  const {
    data: newReleases,
    isLoading: newReleasesIsLoading,
    error: newReleasesError,
  } = useQuery("newReleases", fetchNewReleases(), {
    staleTime: 1000 * 60 * 12,
    cacheTime: 1000 * 60 * 60 * 5,
    retry: 1,
  });
  const {
    data: topRatedGames,
    isLoading: topRatedIsLoading,
    error: topRatedError,
  } = useQuery("topRatedGames", fetchTopRatedGames(), {
    staleTime: 1000 * 60 * 12,
    cacheTime: 1000 * 60 * 60 * 5,
    retry: 1,
  });
  const {
    data: upcomingGames,
    isLoading: upcomingIsLoading,
    error: upcomingError,
  } = useQuery("upcomingGames", fetchUpcomingGames(), {
    staleTime: 1000 * 60 * 12,
    cacheTime: 1000 * 60 * 60 * 5,
    retry: 1,
  });
  const {
    data: gameOfTheDay,
    isLoading: gameOfTheDayIsLoading,
    error: gameOfTheDayError,
  } = useQuery("gameOfTheDay", fetchGameOfTheDay, {
    staleTime: 1000 * 60 * 12,
    cacheTime: 1000 * 60 * 60 * 5,
    retry: 1,
  });

  const loading =
    popularIsLoading ||
    newReleasesIsLoading ||
    topRatedIsLoading ||
    upcomingIsLoading ||
    gameOfTheDayIsLoading;

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
                    games={popularGames ? popularGames.slice(0, 5) : []}
                    className="game-slider"
                  />
                  <h2 className="carousel-title">New Releases</h2>
                  <SlickCarousel
                    games={newReleases ? newReleases.slice(0, 10) : []}
                    className="game-slider"
                  />
                  <h2 className="carousel-title">Top Rated</h2>
                  <SlickCarousel
                    games={topRatedGames ? topRatedGames.slice(0, 5) : []}
                    className="game-slider"
                  />
                </div>
                <div className="flex-container-column right">
                  <h2>Upcoming</h2>
                  {upcomingGames &&
                    upcomingGames.map((game) => {
                      return <Upcoming game={game && game} key={game.id} />;
                    })}

                  <h2>Game Of The Day</h2>
                  {gameOfTheDay ? (
                    <Gotd game={gameOfTheDay && gameOfTheDay} />
                  ) : (
                    <Loading className="loading-component" />
                  )}
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
