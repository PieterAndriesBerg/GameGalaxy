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

export const fetchNewReleases = async () => {
  // Last 30 days
  const currentDate = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(currentDate.getDate() - 30);

  // Format Date range for API request
  const dateRange = `${thirtyDaysAgo.toISOString().split("T")[0]},${
    currentDate.toISOString().split("T")[0]
  }`;

  try {
    let response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: process.env.REACT_APP_RAWG_API_KEY,
        ordering: "-released",
        dates: dateRange,
      },
    });

    console.log("New Releases", response.data.results);

    return response.data; // Return only the first 5 games
  } catch (error) {
    console.error("Error fetching new releases", error);
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

export const fetchTopRatedGames = async () => {
  try {
    const currentDate = new Date();
    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(currentDate.getFullYear() - 10);

    const fromDate = tenYearsAgo.toISOString().split("T")[0];
    const toDate = currentDate.toISOString().split("T")[0];

    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: process.env.REACT_APP_RAWG_API_KEY,
        ordering: "-metacritic",
        page_size: 5,
        dates: `${fromDate},${toDate}`,
      },
    });

    console.log("TOP RATED:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching top rated games:", error);
    return [];
  }
};

export const fetchUpcomingGames = async () => {
  const currentDate = new Date();

  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(currentDate.getDate() + 14);

  const dateRange = `${currentDate.toISOString().split("T")[0]},${
    twoWeeksFromNow.toISOString().split("T")[0]
  }`;

  try {
    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: process.env.REACT_APP_RAWG_API_KEY,
        ordering: "-released",
        dates: dateRange,
      },
    });

    const upcomingGames = response.data.results.filter((game) => {
      const gameReleaseDate = new Date(game.released);
      return gameReleaseDate > currentDate && game["background_image"] !== null;
    });

    console.log("Upcoming Games", upcomingGames);

    return upcomingGames.slice(0, 4);
  } catch (error) {
    console.error("Error fetching upcoming games", error);
    return [];
  }
};

// TODO: Get a random game

// TODO: Get a game based on Mood from the user. e.g. (map angry to a genre etc)

//TODO: Get games based on search value (e.g. user searches for "Batman" fetch everything with batman in its name)
