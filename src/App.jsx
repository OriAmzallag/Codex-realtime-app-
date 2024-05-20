import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AsyncCase from "./components/AsyncCase";
import LoopCase from "./components/LoopCase";
import CallbackCase from "./components/CallbackCase";
import EventHandlingCase from "./components/EventHandlingCase";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AsyncCase" element={<AsyncCase />} />
        <Route path="/LoopCase" element={<LoopCase />} />
        <Route path="/CallbackCase" element={<CallbackCase />} />
        <Route path="/EventHandlingCase" element={<EventHandlingCase />} />
      </Routes>
    </>
  );
}
