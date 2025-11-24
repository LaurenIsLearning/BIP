import { useState } from "react";

interface Props {
  onSaved: () => void;
}

export default function AddTeamForm({ onSaved }: Props) {
  const [teamName, setTeamName] = useState("");
  const [sessionPoints, setSessionPoints] = useState(0);
  const [ranking, setRanking] = useState(0);

  async function saveTeam() {
    await fetch("http://localhost:3000/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        teamName,
        sessionPoints,
        ranking,
        players: [],
      }),
    });

    onSaved();
  }

  return (
    <>
      <label>Team Name</label>
      <input value={teamName} onChange={(e) => setTeamName(e.target.value)} />

      <label>Session Points</label>
      <input
        type="number"
        value={sessionPoints}
        onChange={(e) => setSessionPoints(Number(e.target.value))}
      />

      <label>Ranking</label>
      <input
        type="number"
        value={ranking}
        onChange={(e) => setRanking(Number(e.target.value))}
      />

      <button onClick={saveTeam}>Add Team</button>
    </>
  );
}
