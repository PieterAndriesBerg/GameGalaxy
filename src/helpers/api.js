// This file will contain all helper functions related to api RAWG.IO

// TODO: Get a list of games that are popular

import axios from "axios";

export const fetchPopularGames = async () => {
  try {
    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: process.env.REACT_APP_RAWG_API_KEY,
        ordering: "-added",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching popular games: ", error);
    return [];
  }
};

export const fetchGameDetails = async (id) => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}`, {
      params: {
        key: process.env.REACT_APP_RAWG_API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching game details:", error);
  }
};

export const fetchNewReleases = async () => {
  try {
    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: process.env.REACT_APP_RAWG_API_KEY,
        ordering: "-releases",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching new releases", error);
    return [];
  }
};

// TODO: Get a list of games that are top rated

// TODO: Get a random game

// TODO: Get a game based on Mood from the user. e.g. (map angry to a genre etc)

//TODO: Get games based on search value (e.g. user searches for "Batman" fetch everything with batman in its name)
