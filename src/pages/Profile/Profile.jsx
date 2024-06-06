import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider.jsx";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Header from "../../components/Header/Header.jsx";

import "./Profile.css";

const Profile = () => {
  const { username } = useParams();
  const { logout, user, loading } = useAuth();
  const [likedGames, setLikedGames] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      console.log("from profile", user);
      // Fetch user info
      axios
        .get(`https://api.datavortex.nl/movielux/users/${username}`, {
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "movielux:itycrNMvSKgvPssF1iZE",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setUserInfo(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user info: ", error);
        });
    }
  }, [loading, user]);

  if (loading || !user || user.username !== username) {
    return null; // Don't render anything if user is not logged in
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
