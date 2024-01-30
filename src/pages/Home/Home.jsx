import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import "./Home.css";
const Home = () => {
  const [filters, setFilters] = useState([]);

  const names = ["abs", "def"];
  const surnames = ["ghi,jkl"];

  return (
    <>
      <div className="flex-container">
        <NavBar />
        <div></div>
      </div>
    </>
  );
};

export default Home;
