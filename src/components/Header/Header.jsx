import React, { useEffect, useState } from "react";
import GameGalaxyLogo from "../../assets/logo.svg?react";
import "./Header.css";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { useAuth } from "../../context/AuthProvider.jsx";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Header = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState("");

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  useEffect(() => {
    if (user ? user.token && typeof user.token === "string" : null) {
      const decodedToken = jwtDecode(user.token);
      setUsername(decodedToken.sub);
    } else {
      console.error("Invalid token:", user ? user.token : "No user logged in?");
      // handle invalid token here
    }
  }, [user]);

  return (
    <header className="header">
      <GameGalaxyLogo className="gamegalaxy-logo" />
      {user ? (
        <h3 className="greeting">{`${getGreeting()}, ${username}`}</h3>
      ) : (
        <Link to="/login" className="login-link">
          Login
        </Link> // Redirect to login page if no user
      )}
      <SearchBar />
    </header>
  );
};

export default Header;
