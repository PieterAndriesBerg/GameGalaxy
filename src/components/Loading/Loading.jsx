import React from "react";
import LoadingLogo from "../../assets/loading.svg?react";
import "./Loading.css";

const Loading = () => {
  return (
    <div id="loader-container">
      <LoadingLogo id="loader" />
    </div>
  );
};

export default Loading;
