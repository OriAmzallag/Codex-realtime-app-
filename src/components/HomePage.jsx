import React from "react";
import { useNavigate } from "react-router-dom";
import "./Pages.css";

const HomePage = () => {
  const navigate = useNavigate();
  const cases = [
    {name: "Async Case", path: "./AsyncCase"},
    {name: "Loop Case", path: "./LoopCase"},
     {name: "Callback Case", path: "./CallbackCase"},
     {name: "Event Handling Case", path: "./EventHandlingCase"}
    ];
  return (
    <>
      <h1>Codex - Your Code Solution for COVID</h1>
      <h2>Choose Code Block</h2>
      <div className="container">
        {cases.map((caseItem) => (
            <button
            type="button"
            className="button"
            onClick={() => navigate(caseItem.path)}
          >
            {caseItem.name}
          </button>
        ))}
      </div>
      <h3 id="rule">Simple rule: first to click on the button is the Mentor</h3>
    </>
  );
};

export default HomePage;
