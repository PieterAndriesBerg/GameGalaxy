import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SlickCarousel.css";
import GameCard from "../GameCard/GameCard.jsx";

const SlickCarousel = ({ games }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    speed: 2000,
    autoplaySpeed: 10000,
    cssEase: "linear",
  };

  games && console.log("Games we get is:", games);

  return (
    <Slider {...settings} className="game-slider">
      {games
        ? games.map((game) => {
            return <GameCard game={game} key={game.id} />;
          })
        : "No games"}
    </Slider>
  );
};

export default SlickCarousel;
