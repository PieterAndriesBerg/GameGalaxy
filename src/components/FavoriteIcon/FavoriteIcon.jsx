import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { saveToFavorites } from "../../helpers/saveToFavorites.js";
import { useAuth } from "../../context/AuthProvider.jsx"; // Import useAuth

const FavoriteIcon = ({ gameId }) => {
  const [isFav, setIsFav] = useState(false);
  const { user } = useAuth(); // Use useAuth to get the user

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `https://api.datavortex.nl/movielux/users/${user.username}`,
            {
              headers: {
                "Content-Type": "application/json",
                "X-Api-Key": "movielux:itycrNMvSKgvPssF1iZE",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          let favorites = response.data.info
            ? response.data.info.split(",")
            : [];

          if (favorites.includes(gameId.toString())) {
            setIsFav(true);
          }
        } catch (error) {
          console.error("Error fetching user's info: ", error);
        }
      }
    };

    void fetchFavorites();
  }, [gameId, user]);

  const handleHeartClick = (event) => {
    void saveToFavorites(gameId, user);
    setIsFav(!isFav);
  };

  return (
    <FontAwesomeIcon
      icon={isFav ? solidHeart : regularHeart}
      onClick={handleHeartClick}
      size="3x"
    />
  );
};

export default FavoriteIcon;
