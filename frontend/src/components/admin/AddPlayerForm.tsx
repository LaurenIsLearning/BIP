import { useState } from "react";
import { Team } from "../../models/Team";
import { Player } from "../../models/Player";

interface Props {
  teams: Team[];
  onSaved: () => void;
}

export default function AddPlayerForm({ teams, onSaved }: Props) {
  const [teamId, setTeamId] = useState<string>("");
  const [playerName, setPlayerName] = useState("");
  const [skillLevel, setSkillLevel] = useState(3);

  async function savePlayer() {
    if (!teamId) return;

    const newPlayer: Partial<Player> = {
      playerId: crypto.randomUUID(),  // generate unique ID
      playerName,
      skillLevel,
      sessionWR: 0,
      sessionPA: 0,
      overallWR: 0,
      overallMP: 0,
      played: false,
    };

    await fetch(`http://localhost:3000/api/teams/${teamId}/players`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlayer),
    });

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

      <label>Player Name</label>
      <input value={playerName} onChange={(e) => setPlayerName(e.target.value)} />

      <label>Skill Level</label>
      <input
        type="number"
        value={skillLevel}
        onChange={(e) => setSkillLevel(Number(e.target.value))}
        min={2}
        max={7}
      />

      <button onClick={savePlayer}>Add Player</button>
    </>
  );
}
