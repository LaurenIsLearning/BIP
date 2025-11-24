import { useState } from "react";

interface Team {
  id: number;
  name: string;
}

interface Props {
  teams: Team[];
  onSaved: () => void;
}

export default function AddPlayerForm({ teams, onSaved }: Props) {
  const [teamId, setTeamId] = useState<number | null>(null);

  const [player, setPlayer] = useState({
    name: "",
    skill: 2,
    sessWR: 0,
    sessPA: 0,
    overallWR: 0,
    overallMP: 0,
  });

  async function savePlayer() {
    if (!teamId) return;

    await fetch(`http://localhost:3000/api/players/team/${teamId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(player),
    });

    onSaved();
  }

  return (
    <>
      <h2>Add Player</h2>

      <label>Select Team</label>
      <select value={teamId ?? ""} onChange={(e) => setTeamId(Number(e.target.value))}>
        <option value="">Choose...</option>
        {teams.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      <label>Name</label>
      <input value={player.name} onChange={(e) => setPlayer({ ...player, name: e.target.value })} />

      <label>Skill</label>
      <input
        type="number"
        value={player.skill}
        onChange={(e) => setPlayer({ ...player, skill: Number(e.target.value) })}
      />

      <label>Session WR</label>
      <input
        type="number"
        value={player.sessWR}
        onChange={(e) => setPlayer({ ...player, sessWR: Number(e.target.value) })}
      />

      <label>Session PA</label>
      <input
        type="number"
        value={player.sessPA}
        onChange={(e) => setPlayer({ ...player, sessPA: Number(e.target.value) })}
      />

      <label>Overall WR</label>
      <input
        type="number"
        value={player.overallWR}
        onChange={(e) => setPlayer({ ...player, overallWR: Number(e.target.value) })}
      />

      <label>Overall MP</label>
      <input
        type="number"
        value={player.overallMP}
        onChange={(e) => setPlayer({ ...player, overallMP: Number(e.target.value) })}
      />

      <button onClick={savePlayer}>Save Player</button>
    </>
  );
}
