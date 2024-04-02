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

const Genres = () => {
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const gamesPerPage = 20;
  const [totalGames, setTotalGames] = useState(0);

  // Fetch Genre Cards
  const {
    isLoading,
    isError,
    isFetching: isFetchingGenres,
    isStale: isStaleGenres,
    data: genres,
  } = useQuery("genres", fetchGenres, {
    staleTime: 1000 * 60 * 60 * 5,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  // Fetch Games for genre if clicked
  const {
    data: selectedGenreGames,
    isFetching: isFetchingGames,
    isStale: isStaleGames,
  } = useQuery(
    ["gamesByGenre", selectedGenreId, page],
    () => (selectedGenreId ? fetchGamesByGenre(selectedGenreId, page) : null),
    {
      enabled: !!selectedGenreId,
      staleTime: 1000 * 60 * 60 * 5,
      cacheTime: 1000 * 60 * 60 * 5,
    }
  );

  const handlePageChange = async (newPage) => {
    setPage(newPage);
  };

  const handleGenreClick = async (genreId) => {
    setSelectedGenreId(genreId);
  };

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

  useEffect(() => {
    if (!isFetchingGenres && !isStaleGenres) {
      console.log("Genres data is served from the cache");
    } else if (isFetchingGenres) {
      console.log("Genres data is currently being fetched");
    } else if (!isFetchingGenres && isStaleGenres) {
      console.log("Genres data is stale and needs to be refetched");
    }

    if (!isFetchingGames && !isStaleGames) {
      console.log("Selected genre games data is served from the cache");
    } else if (isFetchingGames) {
      console.log("Selected genre games data is currently being fetched");
    } else if (!isFetchingGames && isStaleGames) {
      console.log(
        "Selected genre games data is stale and needs to be refetched"
      );
    }
  }, [isFetchingGenres, isStaleGenres, isFetchingGames, isStaleGames]);

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
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                handlePageChange={handlePageChange}
                totalPages={totalPages}
              />
            )}
            <div className="genres-list-row">
              <GameList
                games={
                  typeof selectedGenreGames === "function"
                    ? selectedGenreGames
                    : selectedGenreGames || []
                }
              />
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                handlePageChange={handlePageChange}
                totalPages={totalPages}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Genres;
