import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameDetails } from "../../helpers/api.js";
import "./GameDetailsPage.css";

const GameDetailsPage = () => {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGameDetails(id);
        setGameDetails(response);
      } catch (error) {
        console.error("Problem Fetching Game Details", error);
      }
    };

    void fetchData();
  }, [id]);

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
