import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const StarRating = ({ ratingTitle }) => {
  const ratings = {
    exceptional: 5,
    recommended: 3,
    meh: 2,
    skip: 0,
  };

  const stars = Array(ratings[ratingTitle])
    .fill(0)
    .map((_, index) => <FontAwesomeIcon key={index} icon={faStar} />);

  return <div>{stars}</div>;
};

export default StarRating;
