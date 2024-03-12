import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Header from "../../components/Header/Header.jsx";
import "./Genres.css";
import Loading from "../../components/Loading/Loading.jsx";
import { fetchGamesByGenre, fetchGenres } from "../../helpers/api.js";
import GenreCard from "../../components/GenreCard/GenreCard.jsx";
import GameList from "../../components/GamesList/GameList.jsx";

const Genres = () => {
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenreGames, setSelectedGenreGames] = useState([]);

  const handleGenreClick = async (genreId) => {
    setLoading(true);
    const games = await fetchGamesByGenre(genreId);
    setSelectedGenreGames(games);
    setLoading(false);
  };

  useEffect(() => {
    console.log(selectedGenreGames);
  }, [selectedGenreGames]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genres] = await Promise.all([fetchGenres()]);

        setGenres(genres);
      } catch (error) {
        console.error("Error Fetching Data in Genres.jsx", error);
      }
    };
    void fetchData();
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
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
              <GameList games={selectedGenreGames} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Genres;
