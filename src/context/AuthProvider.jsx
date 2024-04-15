import { useMutation } from "react-query";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { isTokenExpired } from "../helpers/tokenUtils.js";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [logoutTimer, setLogoutTimer] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      setUser({ token }); // set user with token if it exists in localStorage and is not expired
      setLogoutTimer(setTimeout(logout, 15 * 60 * 1000)); // start the logout timer when the user logs in
    } else {
      setUser(null); // set user to null if token does not exist or is expired
    }

    const resetLogoutTimer = () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer); // clear the logout timer when the user logs in
        setLogoutTimer(setTimeout(logout, 15 * 60 * 1000));
      }
    };

    // Add event listeners to reset the logout timer when the user interacts with the page
    window.addEventListener("click", resetLogoutTimer);
    window.addEventListener("keypress", resetLogoutTimer);
    window.addEventListener("scroll", resetLogoutTimer);
    window.addEventListener("mousemove", resetLogoutTimer);

    return () => {
      // cleanup
      window.removeEventListener("click", resetLogoutTimer);
      window.removeEventListener("keypress", resetLogoutTimer);
      window.removeEventListener("scroll", resetLogoutTimer);
      window.removeEventListener("mousemove", resetLogoutTimer);
    };
  }, []);

  const loginMutation = useMutation(
    async ({ username, password }) => {
      const response = await axios.post(
        "https://api.datavortex.nl/movielux/users/authenticate",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "movielux:itycrNMvSKgvPssF1iZE",
          },
        }
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log("token data:", data.jwt);
        localStorage.setItem("token", data.jwt); // save token to localStorage
        setUser({ token: data.jwt }); // call setUser directly here
      },
      onError: (error) => {
        console.error("Error logging in: ", error);
      },
    }
  );

  const registerMutation = useMutation(
    async ({ username, email, password, info, authorities }) => {
      const response = await axios.post(
        "https://api.datavortex.nl/movielux/users",
        {
          username,
          email,
          password,
          info,
          authorities,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "movielux:itycrNMvSKgvPssF1iZE",
          },
        }
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log("Registration successful", data);
        localStorage.setItem("token", data.jwt); // save token to localStorage
        setUser({ token: data.jwt }); // call setUser directly here
      },
      onError: (error) => {
        console.error("Registration failed", error);
      },
    }
  );

  const logout = () => {
    localStorage.removeItem("token"); // remove token from localStorage
    setUser(null);
    if (logoutTimer) {
      clearTimeout(logoutTimer); // clear the logout timer when the user logs out
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: loginMutation.mutate,
        register: registerMutation.mutate,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
