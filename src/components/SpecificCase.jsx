import React from "react";
import CasePage from "./CasePage";

export const AsyncCase = () => (
  <CasePage caseName="AsyncCase" title={`Async Case: Incorrect Async \n Function Usage`} />
);
export const CallbackCase = () => (
  <CasePage caseName="CallbackCase" title="Callback Case: Correcting Callback Execution in a Loop" />
);
export const LoopCase = () => (
  <CasePage caseName="LoopCase" title="Loop Case: Misunderstanding Asynchronous Loops" />
);
export const EventHandlingCase = () => (
  <CasePage caseName="EventHandlingCase" title="Event Handling Case: Incorrect Async Function Usage" />
);
