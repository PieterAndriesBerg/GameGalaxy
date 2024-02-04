import React from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import "../general-page-style.css";

const Mood = () => {
  return (
    <div className="flex-container">
      <NavBar />
      <h1>Welcome to Mood</h1>
    </div>
  );
};

export default Mood;
