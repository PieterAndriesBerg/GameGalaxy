import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Header from "../../components/Header/Header.jsx";
import "./Genres.css";
import Loading from "../../components/Loading/Loading.jsx";
import { fetchGamesByGenre, fetchGenres } from "../../helpers/api.js";
import GenreCard from "../../components/GenreCard/GenreCard.jsx";
import GameList from "../../components/GamesList/GameList.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
//TODO: Check of cache wel echt werkt voor api calls

const Genres = () => {
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const gamesPerPage = 20;
  const [totalGames, setTotalGames] = useState(0);

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
    () => fetchGamesByGenre(selectedGenreId, page),
    {
      enabled: false,
      staleTime: 1000 * 60 * 60 * 5,
      cacheTime: 1000 * 60 * 60 * 5,
      initialData: location.state?.selectedGenreGames,
    }
  );

  const handlePageChange = async (newPage) => {
    setPage(newPage);
  };

  const handleGenreClick = async (genreId) => {
    setSelectedGenreId(genreId);
    await refetchGamesByGenre();
    navigate(location.pathname, { state: { selectedGenreGames } });
  };

  useEffect(() => {
    if (selectedGenreId) {
      void refetchGamesByGenre();
    }
  }, [page, selectedGenreId]);

  useEffect(() => {
    if (genres && selectedGenreId) {
      const selectedGenre = genres.find(
        (genre) => genre.id === selectedGenreId
      );
      if (selectedGenre) {
        setTotalGames(selectedGenre["games_count"]);
      }
    }
  }, [genres, selectedGenreId]);

  const totalPages = Math.ceil(totalGames / gamesPerPage);

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
              <Pagination
                currentPage={page}
                handlePageChange={handlePageChange}
                totalPages={totalPages}
              />
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
