import { useMutation } from "react-query";
import React, { useContext, useState } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginMutation = useMutation(
    ({ username, password }) => {
      return axios.post(
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
    },
    {
      onSuccess: (data) => {
        console.log(data);
        setUser(data.data); // call setUser directly here
      },
      onError: (error) => {
        console.error("Error logging in: ", error);
      },
    }
  );

  const registerMutation = useMutation(
    ({ username, email, password, info, authorities }) =>
      axios.post(
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
      ),
    {
      onSuccess: (data) => {
        console.log("Registration successful", data);
        setUser(data.data); // call setUser directly here
      },
      onError: (error) => {
        console.error("Registration failed", error);
      },
    }
  );

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: loginMutation.mutate, // pass the mutate function here
        register: registerMutation.mutate, // pass the mutate function here
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
