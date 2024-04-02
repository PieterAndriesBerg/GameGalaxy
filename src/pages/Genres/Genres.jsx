import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Header from "../../components/Header/Header.jsx";
import "./Genres.css";
import Loading from "../../components/Loading/Loading.jsx";
import { fetchGamesByGenre, fetchGenres } from "../../helpers/api.js";
import GenreCard from "../../components/GenreCard/GenreCard.jsx";
import GameList from "../../components/GamesList/GameList.jsx";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

//TODO: Check of cache wel echt werkt voor api calls

const Genres = () => {
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isLoading,
    isError,
    data: genres,
  } = useQuery("genres", fetchGenres, {
    staleTime: 1000 * 60 * 60 * 5,
    cacheTime: 1000 * 60 * 60 * 5,
  });
  const { data: selectedGenreGames, refetch: refetchGamesByGenre } = useQuery(
    ["gamesByGenre", selectedGenreId],
    () => fetchGamesByGenre(selectedGenreId),
    {
      enabled: false,
      staleTime: 1000 * 60 * 60 * 5,
      cacheTime: 1000 * 60 * 60 * 5,
      initialData: location.state?.selectedGenreGames,
    }
  );

  const handleGenreClick = async (genreId) => {
    setSelectedGenreId(genreId);
    await refetchGamesByGenre();
    navigate(location.pathname, { state: { selectedGenreGames } });
  };

  useEffect(() => {
    if (selectedGenreId) {
      void refetchGamesByGenre();
    }
  }, [selectedGenreId]);

  useEffect(() => {
    console.log(selectedGenreGames);
    console.log("GENRES", genres);
  }, [selectedGenreGames, genres]);

  return (
    <>
      {isLoading && !genres && !selectedGenreGames ? (
        <Loading />
      ) : (
        <div className="genres-flex-container">
          <NavBar />
          <div className="genres-flex-container-column">
            <Header />
            <div className="genres-list-row">
              {genres &&
                genres.map((genre) => (
                  <GenreCard
                    genre={genre}
                    key={genre.id}
                    onClick={() => handleGenreClick(genre.id)}
                  />
                ))}
              <GameList
                games={
                  typeof selectedGenreGames === "function"
                    ? selectedGenreGames
                    : selectedGenreGames || []
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Genres;
