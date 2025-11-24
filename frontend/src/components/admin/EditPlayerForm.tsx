import { useState } from "react";
import { Team } from "../../models/Team";
import { Player } from "../../models/Player";

interface Props {
  teams: Team[];
  onSaved: () => void;
}

export default function EditPlayerForm({ teams, onSaved }: Props) {
  const [teamId, setTeamId] = useState<string>("");
  const [playerId, setPlayerId] = useState<string>("");

  const team = teams.find((t) => t.teamId === teamId);
  const player = team?.players.find((p) => p.playerId === playerId);

  async function savePlayer() {
    if (!teamId || !player) return;

    await fetch(
      `http://localhost:3000/api/teams/${teamId}/players/${player.playerId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(player),
      }
    );

    onSaved();
  }

  return (
    <>
      <label>Select Team</label>
      <select value={teamId} onChange={(e) => setTeamId(e.target.value)}>
        <option value="">Choose...</option>
        {teams.map((t) => (
          <option key={t.teamId} value={t.teamId}>
            {t.teamName}
          </option>
        ))}
      </select>

      {team && (
        <>
          <label>Select Player</label>
          <select
            value={playerId}
            onChange={(e) => setPlayerId(e.target.value)}
          >
            <option value="">Choose...</option>
            {team.players.map((p) => (
              <option key={p.playerId} value={p.playerId}>
                {p.playerName}
              </option>
            ))}
          </select>
        </>
      )}

      {player && (
        <>
          <label>Player Name</label>
          <input
            value={player.playerName}
            onChange={(e) => (player.playerName = e.target.value)}
          />

          <label>Skill Level</label>
          <input
            type="number"
            value={player.skillLevel}
            onChange={(e) => (player.skillLevel = Number(e.target.value))}
            min={2}
            max={7}
          />

          <button onClick={savePlayer}>Save Changes</button>
        </>
      )}
    </>
  );
}
