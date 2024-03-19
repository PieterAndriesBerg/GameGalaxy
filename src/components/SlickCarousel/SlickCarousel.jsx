import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SlickCarousel.css";
import GameCard from "../GameCard/GameCard.jsx";

const SlickCarousel = ({ games }) => {
  console.log("SLICKCAROUSEL:", games);
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

  const gamesList = games || [];

  // Limit the number of games to the first 5
  const limitedGames = (games || []).slice(0, 5);

  return (
    <>
      <Slider {...settings} className="game-slider">
        {gamesList.length > 0
          ? limitedGames.map((game) => {
              return <GameCard game={game} key={game.id} />;
            })
          : "No games"}
      </Slider>
    </>
  );
};

export default SlickCarousel;
