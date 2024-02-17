import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SlickCarousel.css";

const SlickCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <div className="carousel-div">
      <Slider {...settings}>
        {/*  TODO: Place Game Cards here first 3 of every category (Popular, Upcoming, Top Rated*/}
      </Slider>
    </div>
  );
};

export default SlickCarousel;
