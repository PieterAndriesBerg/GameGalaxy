import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Header from "../../components/Header/Header.jsx";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState("");
  const [authorities, setAuthorities] = useState([{ authority: "USER" }]);
  const { register } = useAuth();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return; // Validate form and return early if there are errors
    try {
      await register({ username, email, password, info, authorities });
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!username) formErrors.username = "Username is required";
    if (!email) formErrors.email = "Email is required";
    if (!password) formErrors.password = "Password is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Returns true if no errors
  };

  return (
    <>
      <Header />

      <div className="register-container">
        <div className="register-form">
          <h1>Register</h1>
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
              Email:
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="email-input"
                required
              />
              {errors.email && <p>{errors.email}</p>}{" "}
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
              Register
            </button>
          </form>
          <div className="additional-message">
            A galaxy full of games is waiting for you! Register Now
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

export default Register;
