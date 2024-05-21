import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchDevelopers } from "../../helpers/api.js";
import NavBar from "../../components/NavBar/NavBar.jsx";
import DeveloperBox from "../../components/DeveloperBox/DeveloperBox.jsx";
import Header from "../../components/Header/Header.jsx";
import "./Developers.css";
import Loading from "../../components/Loading/Loading.jsx";

const Developers = () => {
  const [pageUrl, setPageUrl] = useState("https://api.rawg.io/api/developers");

  const { data, status } = useQuery(
    ["developers", pageUrl],
    () => fetchDevelopers(pageUrl),
    {
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24 * 7, // Data is cached for 7 days
    }
  );

  const fetchNextPage = () => {
    if (data?.["next"]) {
      setPageUrl(data["next"]);
    }
  };

  const fetchPreviousPage = () => {
    if (data?.["previous"]) {
      setPageUrl(data["previous"]);
    }
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    return <div>Error fetching developers</div>;
  }

  return (
    <div className="developers-flex-container">
      <NavBar />
      <div className="developers-flex-container-column">
        <Header />
        <h1>Welcome to Developers</h1>
        <div className="developers-data-row">
          {data?.results
            ? data.results.map((developer) => (
                <DeveloperBox key={developer.id} developer={developer} />
              ))
            : null}
        </div>
        <div>
          <button onClick={fetchPreviousPage}>Previous Page</button>
          <button onClick={fetchNextPage}>Next Page</button>
        </div>
      </div>
    </div>
  );
};

export default Developers;
