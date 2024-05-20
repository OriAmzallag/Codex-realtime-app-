import React from "react";
import { useNavigate } from "react-router-dom";
import "./Pages.css";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Codex - Your Code Solution for COVID</h1>
      <h2>Choose Code Block</h2>
      <div className="container">
        <button
          type="button"
          className="button"
          onClick={() => navigate("./FirstCase")}
        >
          Async Case
        </button>
        <button
          type="button"
          className="button"
          onClick={() => navigate("./SecondCase")}
        >
          Loop Case
        </button>
        <button
          type="button"
          className="button"
          onClick={() => navigate("./ThirdCase")}
        >
          Callback Case
        </button>
        <button
          type="button"
          className="button"
          onClick={() => navigate("./ForthCase")}
        >
          Event Handling Case
        </button>
      </div>
    </>
  );
};

export default HomePage;
