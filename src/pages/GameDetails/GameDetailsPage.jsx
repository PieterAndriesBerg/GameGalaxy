import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchGameDetails } from "../../helpers/api.js";
import "./GameDetailsPage.css";
import { useQuery } from "react-query";

const GameDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();

  const {
    isLoading,
    isError,
    isFetching,
    isStale,
    data: gameDetails,
  } = useQuery(["gameDetails", id], () => fetchGameDetails(id), {
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 5,
    cacheTime: 1000 * 60 * 60 * 5,
  });

  const game = location.state?.game;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading game details</div>;
  }

  useEffect(() => {
    console.log(gameDetails);
  }, [gameDetails]);

  return (
    <div className="container-full-game-details">
      <h1>{gameDetails.name}</h1>
      <p>{gameDetails["description_raw"]}</p>
      {/* Add more game details as needed */}
    </div>
  );
};

export default GameDetailsPage;
