import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="flex-container-nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-menu-link" : "default-menu-link"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/genres"
          className={({ isActive }) =>
            isActive ? "active-menu-link" : "default-menu-link"
          }
        >
          Genres
        </NavLink>
        <NavLink
          to="/developers"
          className={({ isActive }) =>
            isActive ? "active-menu-link" : "default-menu-link"
          }
        >
          Developers
        </NavLink>
        <NavLink
          to="/top100"
          className={({ isActive }) =>
            isActive ? "active-menu-link" : "default-menu-link"
          }
        >
          Top 100
        </NavLink>
        <NavLink
          to="/random"
          className={({ isActive }) =>
            isActive ? "active-menu-link" : "default-menu-link"
          }
        >
          Random
        </NavLink>
        <NavLink
          to="/mood"
          className={({ isActive }) =>
            isActive ? "active-menu-link" : "default-menu-link"
          }
        >
          Mood
        </NavLink>
        <li>Logout</li>
      </ul>
    </nav>
  );
};

export default NavBar;
