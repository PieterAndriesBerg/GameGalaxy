// This file will contain all helper functions related to api RAWG.IO
import axios from "axios";

export const fetchPopularGames = () => {
  return async () => {
    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: process.env.REACT_APP_RAWG_API_KEY,
        page_size: 5,
      },
    });
    console.log("POPULAR GAMES FETCHED", response.data.results);
    return response.data.results;
  };
};

export const fetchNewReleases = () => {
  return async () => {
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

      if (Array.isArray(response.data.results)) {
        console.log("NEW RELEASES FETCHED", response.data.results);
        return response.data.results; // Return only the first 5 games
      } else {
        console.error("Unexpected response data", response.data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching new releases", error);
      return [];
    }
  };
};

// export const fetchGameDetails = (id) => {
//   return async () => {
//     if (!id) {
//       console.error("Error: id is null or undefined");
//       return null;
//     }
//
//     try {
//       const response = await axios.get(`https://api.rawg.io/api/games/${id}`, {
//         params: {
//           key: process.env.REACT_APP_RAWG_API_KEY,
//         },
//       });
//
//       const data = await response.data;
//       console.log("GAME DETAILS FETCHED", data);
//       return data;
//     } catch (error) {
//       console.error("Error fetching game details:", error);
//     }
//   };
// };
export const fetchGameDetails = async (id) => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}`, {
      params: {
        key: process.env.REACT_APP_RAWG_API_KEY,
      },
    });

    const data = await response.data;
    console.log("GAME DETAILS FETCHED", data);
    return data;
  } catch (error) {
    console.error("Error fetching game details:", error);
  }
};

export const fetchGameScreenshots = async (id) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}/screenshots`,
      {
        params: {
          key: process.env.REACT_APP_RAWG_API_KEY,
        },
      }
    );
    console.log("GAME SCREENSHOTS FETCHED", response.data);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching game screenshots:", error);
  }
};

export const fetchGameTrailers = async (id) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}/movies`,
      {
        params: {
          key: process.env.REACT_APP_RAWG_API_KEY,
        },
      }
    );
    console.log("GAME TRAILERS FETCHED", response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching game trailers:", error);
  }
};

export const fetchTopRatedGames = () => {
  return async () => {
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

      console.log("TOP RATED GAMES FETCHED", response.data.results);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching top rated games:", error);
      return [];
    }
  };
};

export const fetchUpcomingGames = () => {
  return async () => {
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
        return (
          gameReleaseDate > currentDate && game["background_image"] !== null
        );
      });

      console.log("UPCOMING GAMES FETCHED", upcomingGames);
      return upcomingGames.slice(0, 4);
    } catch (error) {
      console.error("Error fetching upcoming games", error);
      return [];
    }
  };
};

// export const fetchGameOfTheDay = () => {
//   return async () => {
//     try {
//       const currentDate = new Date(); // get current date as a Date object
//       const currentDateFormatted = currentDate.toISOString().split("T")[0]; // get current date in YYYY-MM-DD format
//
//       // If we don't have a game of the day for the current date, fetch a new one
//       const oneMonthAgo = new Date();
//       oneMonthAgo.setMonth(currentDate.getMonth() - 1);
//
//       const dateRange = `${
//         oneMonthAgo.toISOString().split("T")[0]
//       },${currentDateFormatted}`;
//
//       const response = await axios.get("https://api.rawg.io/api/games", {
//         params: {
//           key: process.env.REACT_APP_RAWG_API_KEY,
//           ordering: "-rating",
//           dates: dateRange, // Fetch games released within the last month
//           page_size: 50,
//         },
//       });
//
//       console.log("API GOTD", response.data.results);
//
//       if (response.data.results.length === 0) {
//         throw new Error("No games found");
//       }
//
//       // Filter out games that have no rating
//       const gamesWithRating = response.data.results.filter(
//         (game) => game["rating"] !== null && game["rating"] !== 0
//       );
//
//       // Check if gamesWithRating is empty
//       if (gamesWithRating.length === 0) {
//         throw new Error("No games with rating found");
//         return null;
//       }
//
//       console.log("GAMES WITH RATING", gamesWithRating);
//
//       // Generate a random index
//       const randomIndex = Math.floor(Math.random() * gamesWithRating.length);
//
//       // Fetch the game details
//       const gameDetails = await fetchGameDetails(
//         gamesWithRating[randomIndex].id
//       )();
//
//       // Store the game of the day and the date it was fetched in local storage
//       localStorage.setItem("gameOfTheDay", JSON.stringify(gameDetails));
//       localStorage.setItem("gameOfTheDayDate", currentDateFormatted); // Store the date as a string
//
//       // Return the game details
//       console.log("GOTD", gameDetails);
//       return gameDetails;
//     } catch (error) {
//       console.error("Error fetching game of the day: ", error);
//       console.error("Error Details: ", error.response.data);
//       return null;
//     }
//   };
// };

export const fetchGameOfTheDay = async () => {
  try {
    const currentDate = new Date(); // get current date as a Date object
    const currentDateFormatted = currentDate.toISOString().split("T")[0]; // get current date in YYYY-MM-DD format

    // If we don't have a game of the day for the current date, fetch a new one
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    const dateRange = `${
      oneMonthAgo.toISOString().split("T")[0]
    },${currentDateFormatted}`;

    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: process.env.REACT_APP_RAWG_API_KEY,
        ordering: "-rating",
        dates: dateRange, // Fetch games released within the last month
        page_size: 50,
      },
    });

    console.log("API GOTD", response.data.results);

    if (response.data.results.length === 0) {
      throw new Error("No games found");
    }

    // Filter out games that have no rating
    const gamesWithRating = response.data.results.filter(
      (game) => game["rating"] !== null && game["rating"] !== 0
    );

    console.log("GAMES WITH RATING", gamesWithRating);

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * gamesWithRating.length);

    // Fetch the game details
    const gameDetails = await fetchGameDetails(gamesWithRating[randomIndex].id);

    // Store the game of the day and the date it was fetched in local storage
    localStorage.setItem("gameOfTheDay", JSON.stringify(gameDetails));
    localStorage.setItem("gameOfTheDayDate", currentDateFormatted); // Store the date as a string

    // Return the game details
    console.log("GOTD", gameDetails);
    return gameDetails;
  } catch (error) {
    console.error("Error fetching game of the day: ", error);
    console.error("Error Details: ", error.response.data);
    return null;
  }
};

export const fetchGenres = async () => {
  try {
    const response = await axios.get("https://api.rawg.io/api/genres", {
      params: {
        key: process.env.REACT_APP_RAWG_API_KEY,
      },
    });

    console.log("GENRES FETCHED", response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

export const fetchGamesByGenre = async (genreId, page = 1) => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/games`, {
      params: {
        key: process.env.REACT_APP_RAWG_API_KEY,
        genres: genreId,
        page_size: 20,
        page: page,
      },
    });

    console.log("GAMES BY GENRE FETCHED", response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching games by genre:", error);
    return [];
  }
};

export const fetchDevelopers = async (
  nextPageUrl = "https://api.rawg.io/api/developers"
) => {
  try {
    const response = await axios.get(nextPageUrl, {
      params: {
        key: process.env.REACT_APP_RAWG_API_KEY,
        page_size: 20,
      },
      timeout: 5000,
    });
    console.log("DEVELOPERS DATA FETCHED", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching developers:", error);
    return [];
  }
};

// TODO: Get a random game

// TODO: Get a game based on Mood from the user. e.g. (map angry to a genre etc)

//TODO: Get games based on search value (e.g. user searches for "Batman" fetch everything with batman in its name)
