import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Header from "../../components/Header/Header.jsx";
import GameCard from "../../components/GameCard/GameCard.jsx"; // Import GameCard
import "./Profile.css";
import { fetchGameDetails, fetchUserInfo } from "../../helpers/api.js"; // Import fetchGameDetails

const Profile = () => {
  const { username } = useParams();
  const { user } = useAuth();

  const { data: userInfo, isLoading: userInfoLoading } = useQuery(
    ["userInfo", username, user?.token],
    () => fetchUserInfo(username, user?.token),
    {
      enabled: !!user,
    }
  );

  useEffect(() => {
    if (user) {
      console.log(userInfo);
    }
  }, []);

  const [likedGames, setLikedGames] = useState([]);

  useEffect(() => {
    if (userInfo?.info) {
      const gameIds = userInfo.info.split(",");
      gameIds.forEach(async (gameId) => {
        const game = await fetchGameDetails(gameId);
        setLikedGames((prevGames) => [...prevGames, game]);
      });
    }
  }, [userInfo]);

  if (userInfoLoading || !user || user.username !== username) {
    return null; // Don't render anything if user is not logged in or data is loading
  }

  return (
    <div className="profile-flex-container">
      <NavBar />
      <div className="profile-flex-column">
        <Header />
        <div className="profile-content-container">
          <h1>Profile of {username}</h1>
          {userInfo && (
            <div>
              <h2>User Info:</h2>
              <p>Username: {userInfo.username}</p>
              <p>Email: {userInfo.email}</p>
              <p>Info: {userInfo.info}</p>
            </div>
          )}
          <div className="favorite-games-container">
            <h2>Favorite Games:</h2>
            {likedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
