import React, { createContext, useContext, useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const useLogin = () => {
    return useMutation(({ username, password }) => {
      axios.post("https://api.datavortex.nl/movielux/users/authenticate", {
        username,
        password,
      }),
        {
          onSuccess: (data) => {
            // save user data and jwt token in the state or local storage
            console.log(data);
            setUser(data.data);
          },
          onError: (error) => {
            // handle error
            console.error("Error logging in: ", error);
          },
        };
    });
  };

  const registerMutation = useMutation(
    ({ username, password }) =>
      axios.post("https://api.datavortex.nl/movielux/users", {
        username,
        password,
      }),
    {
      onSuccess: (data) => {
        // handle successful registration
        console.log("Registration successful", data);
        setUser(data.data); // Save the user data in the state
      },
      onError: (error) => {
        // handle registration error
        console.error("Registration failed", error);
      },
    }
  );

  const useRegister = async (username, password) => {
    try {
      await registerMutation.mutateAsync({ username, password });
    } catch (error) {
      console.error("Error registering mutation: ", error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, useLogin, useRegister, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
