import axios from "axios";

export const saveToFavorites = async (gameId, user) => {
  if (!user) {
    console.log("User is not logged in");
    return; // Return early if user is not logged in
  }
  try {
    // Fetch the current user's info
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

    // Get the current list of favorites
    let favorites = response.data.info ? response.data.info.split(",") : [];

    // Add the new gameId to the list of favorites
    if (!favorites.includes(gameId.toString())) {
      favorites.push(gameId.toString());
    }

    // Update the user's info with the new list of favorites
    await axios.put(
      `https://api.datavortex.nl/movielux/users/${user.username}`,
      {
        info: favorites.join(","), // Convert array to string
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "movielux:itycrNMvSKgvPssF1iZE",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log("Game added to user's info");
  } catch (error) {
    console.error("Error adding game to user's info: ", error);
  }
};
