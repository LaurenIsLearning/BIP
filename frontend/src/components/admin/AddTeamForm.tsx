import { useState } from "react";

interface Props {
  onSaved: () => void;
}

export default function AddTeamForm({ onSaved }: Props) {
  const [name, setName] = useState("");
  const [points, setPoints] = useState(0);

  async function saveTeam() {
    await fetch("http://localhost:3000/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, points }),
    });

    onSaved();
  }

  return (
    <>
      <h2>Add Team</h2>

      <label>Team Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />

      <label>Points</label>
      <input
        type="number"
        value={points}
        onChange={(e) => setPoints(Number(e.target.value))}
      />

      <button onClick={saveTeam}>Save</button>
    </>
  );
}
