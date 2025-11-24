import { useState } from "react";
import { Team } from "../../models/Team";

interface Props {
  teams: Team[];
  onSaved: () => void;
}

export default function EditTeamForm({ teams, onSaved }: Props) {
  const [selectedId, setSelectedId] = useState<string>("");

  const team = teams.find((t) => t.teamId === selectedId);

  async function saveTeam() {
    if (!team) return;

    await fetch(`http://localhost:3000/api/teams/${team.teamId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        teamName: team.teamName,
        sessionPoints: team.sessionPoints
      }),
    });

    onSaved();
  }

  return (
    <>
      <label>Select Team</label>
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        <option value="">Choose...</option>
        {teams.map((t) => (
          <option key={t.teamId} value={t.teamId}>
            {t.teamName}
          </option>
        ))}
      </select>

      {team && (
        <>
          <label>Team Name</label>
          <input
            value={team.teamName}
            onChange={(e) => (team.teamName = e.target.value)}
          />

          <label>Session Points</label>
          <input
            type="number"
            value={team.sessionPoints}
            onChange={(e) => (team.sessionPoints = Number(e.target.value))}
          />

          <label>Ranking</label>
          <input
            type="number"
            value={team.ranking}
            onChange={(e) => (team.ranking = Number(e.target.value))}
          />

          <button onClick={saveTeam}>Save Changes</button>
        </>
      )}
    </>
  );
}
