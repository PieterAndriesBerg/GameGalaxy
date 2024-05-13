import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchGameDetails, fetchGameScreenshots } from "../../helpers/api.js";
import "./GameDetailsPage.css";
import { useQuery } from "react-query";
import Header from "../../components/Header/Header.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Slider from "react-slick";
import WhereToBuy from "../../components/WhereToBuy/WhereToBuy.jsx";

const GameDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const {
    isLoading: isLoadingDetails,
    isError: isErrorDetails,
    isFetching: isFetchingDetails,
    isStale: isStaleDetails,
    data: gameDetails,
  } = useQuery(["gameDetails", id], () => fetchGameDetails(id), {
    staleTime: 1000 * 60 * 60 * 5,
    cacheTime: 1000 * 60 * 60 * 5,
  });

  const {
    isLoading: isLoadingScreenshots,
    isError: isErrorScreenshots,
    isFetching: isFetchingScreenshots,
    isStale: isStaleScreenshots,
    data: gameScreenshots,
  } = useQuery(["gameScreenshots", id], () => fetchGameScreenshots(id), {
    staleTime: 1000 * 60 * 60 * 5,
    cacheTime: 1000 * 60 * 60 * 5,
  });

  const game = location.state?.game;

  if (isLoadingDetails || isLoadingScreenshots) {
    return <div>Loading...</div>;
  }

  if (isErrorDetails || isErrorScreenshots || !gameDetails) {
    return <div>Error loading game details</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentSlide(next),
    customPaging: (i) => (
      <div className={`slick-dots ${currentSlide === i ? "active" : ""}`}>
        <img src={gameScreenshots.results[i].image} alt={`preview ${i}`} />
      </div>
    ),
  };

  const handleStoreLink = (e, url) => {
    e.preventDefault();
    if (!url.startsWith("http") && !url.startsWith("https")) {
      url = `https://${url}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className="flex-container-row-home">
      <NavBar />
      <div className="flex-container-column">
        <Header />
        <div className="container-full-game-details-row">
          <div className="container-full-game-details">
            <h1 className="game-title">{gameDetails.name}</h1>
            <h2>About</h2>
            <p className="game-description_raw">
              {gameDetails.description_raw}
            </p>
          </div>
          <div className="container-full-game-details-images">
            <Slider {...settings} className="screenshots-slider">
              {gameScreenshots.results.map((screenshot) => (
                <div key={screenshot.id}>
                  <img src={screenshot.image} alt={gameDetails.name} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="container-full-game-details-buyinfo">
          <h2>Where to buy</h2>
          <div className="where-to-buy-row">
            {gameDetails["stores"].map((store) => {
              return (
                <WhereToBuy
                  store={store}
                  key={store.id}
                  handleStoreLink={handleStoreLink}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailsPage;
