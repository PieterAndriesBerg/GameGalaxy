import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Header from "../../components/Header/Header.jsx"; // Import your CSS file for styling

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // New state for errors
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return; // Validate form and return early if there are errors
    try {
      await login({ username, password });
      if (login) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!username) formErrors.username = "Email is required";
    if (!password) formErrors.password = "Password is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Returns true if no errors
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="login-form">
          <h1>Login️</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="email-input"
                required
              />
              {errors.username && <p>{errors.username}</p>}{" "}
              {/* Display error message */}
            </label>
            <label>
              Password:
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="password-input"
                required
              />
              {errors.password && <p>{errors.password}</p>}{" "}
              {/* Display error message */}
            </label>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <div className="additional-message">
            A galaxy full of games is waiting for you! Login Now
          </div>
        </div>
        <div className="image-container">
          <img
            src="src/assets/elden-ring.jpg"
            alt="elden-ring"
            className="game-image"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
