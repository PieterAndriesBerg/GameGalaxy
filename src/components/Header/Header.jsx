import React from "react";
import GameGalaxyLogo from "../../assets/logo.svg?react";
import "./Header.css";
import SearchBar from "../SearchBar/SearchBar.jsx";

const Header = () => {
  return (
    <header className="header">
      <GameGalaxyLogo className="gamegalaxy-logo" />
      <h3 className="greeting">Good Evening, User</h3>
      <SearchBar />
    </header>
  );
};

export default Header;
