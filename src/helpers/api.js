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

  let filteredGames = [];

  try {
    let response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: process.env.REACT_APP_RAWG_API_KEY,
        ordering: "-released",
        dates: dateRange,
      },
    });

    // Filter the initial results
    filteredGames = response.data.results.filter(
      (game) => game["ratings_count"] >= 10 && game["metacritic"] !== null
    );

    // Fetch additional pages until we have at least 5 games
    while (filteredGames.length < 5 && response.data.next) {
      const nextPageUrl = response.data.next;
      const nextPageResponse = await axios.get(nextPageUrl);

      // Filter the results from the next page and add them to the array
      const nextPageFilteredGames = nextPageResponse.data.results.filter(
        (game) => game["ratings_count"] >= 10
      );

      filteredGames = filteredGames.concat(nextPageFilteredGames);

      // Update the response variable for the next iteration
      response = nextPageResponse;
    }

    console.log("Filtered games", filteredGames);

    return filteredGames; // Return only the first 5 games
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

// TODO: Get a list of games that are top rated

// TODO: Get a random game

// TODO: Get a game based on Mood from the user. e.g. (map angry to a genre etc)

//TODO: Get games based on search value (e.g. user searches for "Batman" fetch everything with batman in its name)
