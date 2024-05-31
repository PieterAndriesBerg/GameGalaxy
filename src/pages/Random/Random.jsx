import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import "../general-page-style.css";
import Header from "../../components/Header/Header.jsx";
import "./Random.css";
import {
  fetchGenres,
  fetchPlatforms,
  fetchRandomGame,
} from "../../helpers/api.js";
import GameCard from "../../components/GameCard/GameCard.jsx";
import { useQuery } from "react-query";

const Random = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [triggerFetch, setTriggerFetch] = useState(false);

  const platformId = selectedPlatform ? selectedPlatform : null;
  const genreId = selectedGenre ? selectedGenre : null;

  const { data: platforms, status: platformsStatus } = useQuery(
    "platforms",
    fetchPlatforms,
    {
      staleTime: 1000 * 60 * 60 * 5,
      cacheTime: 1000 * 60 * 60 * 24,
    }
  );

  const { data: genres, status: genresStatus } = useQuery(
    "genres",
    fetchGenres,
    {
      staleTime: 1000 * 60 * 60 * 5,
      cacheTime: 1000 * 60 * 60 * 24,
    }
  );

  const {
    data: randomGame,
    isFetching: isFetchingGame,
    error: fetchGameError,
    refetch,
  } = useQuery(
    ["fetchRandomGame", { platformId, genreId }],
    () => fetchRandomGame({ platformId, genreId }),
    {
      enabled: triggerFetch && !!platformId && !!genreId, // Only fetch when triggerFetch is true and platformId and genreId are set
      staleTime: Infinity, // Keep the fetched data fresh indefinitely
      cacheTime: Infinity, // Cache the data indefinitely
      onSuccess: () => setTriggerFetch(false), // Reset triggerFetch after successful fetch
    }
  );

  const handlePlatformChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedPlatform(selectedOption);
  };

  const handleGenreChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedGenre(selectedOption);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTriggerFetch(true); // Set triggerFetch to true to enable fetching
    void refetch(); // Manually trigger the fetch
  };

  if (platformsStatus === "loading" || genresStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (platformsStatus === "error" || genresStatus === "error") {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="random-flex-container">
      <NavBar />
      <div className="random-flex-column">
        <Header />
        <div className="random-games-container">
          <h1>Generate a random game</h1>
          <form className="random-form" onSubmit={handleSubmit}>
            <label>
              Platform:
              <select value={platformId || ""} onChange={handlePlatformChange}>
                <option value="">Select Platform</option>
                {platforms.map((platform) => (
                  <option key={platform.id} value={platform.id}>
                    {platform.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Genre (optional):
              <select value={genreId || ""} onChange={handleGenreChange}>
                <option value="">None</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Generate</button>
          </form>
          {isFetchingGame && <div>Loading...</div>}
          {fetchGameError && <div>Error loading game</div>}
          {randomGame && (
            <div className="random-gamecard-container">
              <GameCard game={randomGame} id="random-gamecard" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Random;
