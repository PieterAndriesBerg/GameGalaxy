import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider.jsx";

// Importing navbar icons
import HomeIcon from "../../assets/navbar-icons/home.svg?react";
import GenresIcon from "../../assets/navbar-icons/genres.svg?react";
import DevelopersIcon from "../../assets/navbar-icons/developers.svg?react";
import MoodIcon from "../../assets/navbar-icons/mood.svg?react";
import RandomIcon from "../../assets/navbar-icons/random.svg?react";
import LogoutIcon from "../../assets/navbar-icons/logout.svg?react";
import Top100Icon from "../../assets/navbar-icons/top-100.svg?react";

const NavBar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar">
      <ul className="flex-container-nav">
        <div className="navlinks-center">
          {user && (
            <NavLink
              to={`/profile/${user.username}`}
              className={({ isActive }) =>
                isActive ? "active-menu-link" : "default-menu-link"
              }
            >
              Profile
            </NavLink>
          )}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active-menu-link" : "default-menu-link"
            }
          >
            <HomeIcon />
          </NavLink>
          <NavLink
            to="/genres"
            className={({ isActive }) =>
              isActive ? "active-menu-link" : "default-menu-link"
            }
          >
            <GenresIcon />
          </NavLink>
          <NavLink
            to="/developers"
            className={({ isActive }) =>
              isActive ? "active-menu-link" : "default-menu-link"
            }
          >
            <DevelopersIcon />
          </NavLink>
          <NavLink
            to="/top100"
            className={({ isActive }) =>
              isActive ? "active-menu-link" : "default-menu-link"
            }
          >
            <Top100Icon />
          </NavLink>
          <NavLink
            to="/random"
            className={({ isActive }) =>
              isActive ? "active-menu-link" : "default-menu-link"
            }
          >
            <RandomIcon />
          </NavLink>
          <NavLink
            to="/mood"
            className={({ isActive }) =>
              isActive ? "active-menu-link" : "default-menu-link"
            }
          >
            <MoodIcon />
          </NavLink>
        </div>
        {user && (
          <div>
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                isActive ? "active-menu-link" : "default-menu-link"
              }
              onClick={(event) => {
                event.preventDefault();
                logout();
                alert("You have been logged out");
              }}
            >
              <LogoutIcon />
            </NavLink>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
