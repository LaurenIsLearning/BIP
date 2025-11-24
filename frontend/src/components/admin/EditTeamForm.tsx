import { useState } from "react";

interface Team {
  id: number;
  name: string;
  points: number;
}

interface Props {
  teams: Team[];
  onSaved: () => void;
}

export default function EditTeamForm({ teams, onSaved }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const team = teams.find((t) => t.id === selectedId);

  async function saveTeam() {
    if (!team) return;

    await fetch(`http://localhost:3000/api/teams/${team.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(team),
    });

    onSaved();
  }

  return (
    <>
      <h2>Edit Team</h2>

      <label>Select Team</label>
      <select
        value={selectedId ?? ""}
        onChange={(e) => setSelectedId(Number(e.target.value))}
      >
        <option value="">Choose...</option>
        {teams.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      {team && (
        <>
          <label>Team Name</label>
          <input
            value={team.name}
            onChange={(e) => (team.name = e.target.value)}
          />

          <label>Points</label>
          <input
            type="number"
            value={team.points}
            onChange={(e) => (team.points = Number(e.target.value))}
          />

          <button onClick={saveTeam}>Save Changes</button>
        </>
      )}
    </>
  );
}
