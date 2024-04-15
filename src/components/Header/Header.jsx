import React, { useEffect, useState } from "react";
import GameGalaxyLogo from "../../assets/logo.svg?react";
import "./Header.css";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { useAuth } from "../../context/AuthProvider.jsx";
import { jwtDecode } from "jwt-decode";

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
    if (user) {
      const decodedToken = jwtDecode(user.token);
      console.log(decodedToken);
      setUsername(decodedToken.sub);
      console.log(username);
    }
  }, [user]);

  return (
    <header className="header">
      <GameGalaxyLogo className="gamegalaxy-logo" />
      {user && <h3 className="greeting">{`${getGreeting()}, ${username}`}</h3>}
      <SearchBar />
    </header>
  );
};

export default Header;
