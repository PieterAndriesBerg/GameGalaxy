import { useMutation } from "react-query";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser({ token, username: decodedToken.sub });
    }
    setLoading(false);
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
        localStorage.setItem("token", data.jwt);
        const decodedToken = jwtDecode(data.jwt);
        setUser({ token: data.jwt, username: decodedToken.sub });
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
        localStorage.setItem("token", data.jwt);
        const decodedToken = jwtDecode(data.jwt);
        setUser({ token: data.jwt, username: decodedToken.sub });
      },
      onError: (error) => {
        console.error("Registration failed", error);
      },
    }
  );

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
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
