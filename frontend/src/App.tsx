import "./App.css";
import { Player } from "./models/Player";
import { Team } from "./models/Team";
import { useState } from "react";
import ComparisonPage from "./pages/ComparisonPage";

function App() {
  return (
    <>
      <ComparisonPage teamOne={teamOne} teamTwo={teamTwo} />
    </>
  );
}

export default App;
