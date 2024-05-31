import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import { AsyncCase, LoopCase, CallbackCase, EventHandlingCase } from "./components/SpecificCase"

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AsyncCase" element={<AsyncCase />} />
        <Route path="/LoopCase" element={<LoopCase />} />
        <Route path="/CallbackCase" element={<CallbackCase />} />
        <Route path="/EventHandlingCase" element={<EventHandlingCase />} />
      </Routes>
  );
}
