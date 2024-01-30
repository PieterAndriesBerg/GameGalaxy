import React from "react";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>Home</li>
        <li>Genres</li>
        <li>Developers</li>
        <li>Top 100</li>
        <li>Random</li>
        <li>Mood</li>
        <li>Logout</li>
      </ul>
    </nav>
  );
};

export default NavBar;
