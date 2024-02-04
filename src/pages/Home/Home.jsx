import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Header from "../../components/Header/Header.jsx";
import "../general-page-style.css";
const Home = () => {
  return (
    <>
      <div className="flex-container">
        <NavBar />
        <Header />
      </div>
    </>
  );
};

export default Home;
