import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import {
  fetchGameDetails,
  fetchGameScreenshots,
  fetchGameTrailers,
} from "../../helpers/api.js";
import { useQuery } from "react-query";
import Header from "../../components/Header/Header.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";

import WhereToBuy from "../../components/WhereToBuy/WhereToBuy.jsx";

import "./GameDetailsPage.css";

const GameDetailsPage = () => {
  const { id } = useParams();
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

  const {
    isLoading: isLoadingTrailers,
    isError: isErrorTrailers,
    isFetching: isFetchingTrailers,
    isStale: isStaleTrailers,
    data: gameTrailers,
  } = useQuery(["gameTrailers", id], () => fetchGameTrailers(id), {
    staleTime: 1000 * 60 * 60 * 5,
    cacheTime: 1000 * 60 * 60 * 5,
  });

  if (isLoadingDetails || isLoadingScreenshots || isLoadingTrailers) {
    return <div>Loading...</div>;
  }

  if (isErrorDetails || isErrorScreenshots || isErrorTrailers || !gameDetails) {
    return <div>Error loading game details</div>;
  }

  const slides = gameTrailers.slice(0, 2).concat(gameScreenshots);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentSlide(next),
    customPaging: (i) => {
      let previewImage;
      if (slides[i]) {
        console.log("slides[i]", slides[i]);
        // Use the trailer preview if a trailer exists, otherwise use the screenshot preview
        previewImage = slides[i]?.preview || slides[i]?.image;
      }
      return (
        <div className={`slick-dots ${currentSlide === i ? "active" : ""}`}>
          <img src={previewImage} alt={`preview ${i}`} />
        </div>
      );
    },
  };

  const handleStoreLink = (e, url) => {
    e.preventDefault();
    if (!url.startsWith("http") && !url.startsWith("https")) {
      url = `https://${url}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className="gamedetails-flex-container-row-home">
      <NavBar />
      <div className="gamedetails-flex-container-column">
        <Header />
        <div className="container-full-game-details-row">
          <div className="container-full-game-details">
            <h1 className="game-title">{gameDetails.name}</h1>
            <h2>About</h2>
            <p className="game-description_raw">
              {gameDetails["description_raw"]}
            </p>
          </div>
          <div className="container-full-game-details-images">
            <Slider {...settings} className="screenshots-slider">
              {gameTrailers && gameTrailers.length > 0
                ? gameTrailers.slice(0, 2).map((trailer) => (
                    <div key={trailer.id} className="div-trailers">
                      <video src={trailer.data.max} controls />
                    </div>
                  ))
                : null}
              {gameScreenshots
                ? gameScreenshots.map((screenshot) => (
                    <div key={screenshot.id} className="div-screenshots">
                      <img src={screenshot.image} alt={gameDetails.name} />
                    </div>
                  ))
                : null}
            </Slider>
          </div>
        </div>
        <div className="container-full-game-details-buyinfo">
          <h2>Where to buy</h2>
          <div className="where-to-buy-row">
            {gameDetails["stores"].map((store) => {
              return (
                store && (
                  <WhereToBuy
                    store={store}
                    key={store.id}
                    handleStoreLink={handleStoreLink}
                  />
                )
              );
            })}
          </div>
        </div>
        <div>
          <h2>Game Info</h2>
          <div className="container-full-game-details-infosection">
            <div>
              <h3>Release Date:</h3>
              <p>{gameDetails.released}</p>
              <h3>Genres:</h3>
              <p>{gameDetails.genres.map((genre) => genre.name).join(", ")}</p>
            </div>
            <div>
              <h3>Platforms:</h3>
              <p>
                {gameDetails.platforms
                  .map((platform) => platform.platform.name)
                  .join(", ")}
              </p>
              <h3>Developers:</h3>
              <p>
                {gameDetails.developers
                  .map((developer) => developer.name)
                  .join(", ")}
              </p>
            </div>
            <div>
              <h3>Publishers:</h3>
              <p>
                {gameDetails.publishers
                  .map((publisher) => publisher.name)
                  .join(", ")}
              </p>
              <h3>Rating:</h3>
              <p>{gameDetails.rating}</p>
            </div>
            <div>
              <h3>Metacritic:</h3>
              <p>{gameDetails.metacritic ? gameDetails.metacritic : "NR"}</p>
              <h3>Average Playtime:</h3>
              <p>{gameDetails.playtime} Hours</p>
            </div>
            <div>
              <h3>ESRB Rating:</h3>
              <p>
                {gameDetails.esrb_rating ? gameDetails.esrb_rating.name : "NR"}
              </p>
              <h3>Website:</h3>
              <Link to={gameDetails.website} target="_blank">
                Click here to visit the website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailsPage;
