import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import FirstCase from "./components/FirstCase";
import SecondCase from "./components/SecondCase";
import ThirdCase from "./components/ThirdCase";
import ForthCase from "./components/ForthCase";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/FirstCase" element={<FirstCase />} />
        <Route path="/SecondCase" element={<SecondCase />} />
        <Route path="/ThirdCase" element={<ThirdCase />} />
        <Route path="/ForthCase" element={<ForthCase />} />
      </Routes>
    </>
  );
}
