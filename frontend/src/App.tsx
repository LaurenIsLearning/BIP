import "./App.css";
import { Player } from "./models/Player";
import { Team } from "./models/Team";
import ComparisonPage from "./pages/ComparisonPage";
import { useState } from "react";
import HomePage from "./pages/HomePage";

function App() {
  const [teamOne, setTeamOne] = useState(
    () =>
      new Team(
        "Rubber Duckies",
        [
          new Player("Alec Codobes", 5, 0.5556, 0.44, 0.5745, 47),
          new Player("Lauren Fries", 3, 0.8182, 0.66, 0.619, 42),
          new Player("Luke Schwieterman", 5, 0.8333, 0.55, 0.5714, 35),
          new Player("Ryan Bentz", 3, 0.7273, 0.51, 0.6471, 34),
          new Player("Jeff Mercer Jr", 6, 0.75, 0.58, 0.75, 28),
          new Player("Hi", 4, 0.8333, 0.55, 0.5714, 35),
          new Player("Hello", 2, 0.7273, 0.51, 0.6471, 34),
          new Player("Waddup", 7, 0.75, 0.58, 0.75, 28),
        ],
        93
      )
  );
  const [teamTwo, setTeamTwo] = useState<Team | null>(null);

  return (
    <>
      <ComparisonPage teamOne={teamOne} />
    </>
  );
}

export default App;
