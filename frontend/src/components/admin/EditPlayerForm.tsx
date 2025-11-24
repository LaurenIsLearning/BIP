import { useEffect, useState } from "react";

interface Team {
  id: number;
  name: string;
}

interface Player {
  id: number;
  name: string;
  skill: number;
  sessWR: number;
  sessPA: number;
  overallWR: number;
  overallMP: number;
}

interface Props {
  teams: Team[];
  onSaved: () => void;
}

export default function EditPlayerForm({ teams, onSaved }: Props) {
  const [teamId, setTeamId] = useState<number | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerId, setPlayerId] = useState<number | null>(null);

  const player = players.find((p) => p.id === playerId);

  // Load players from backend
  useEffect(() => {
    if (!teamId) return;

    fetch(`http://localhost:3000/api/teams/${teamId}/players`)
      .then((r) => r.json())
      .then((data) => setPlayers(data));
  }, [teamId]);

  async function savePlayer() {
    if (!player) return;

    await fetch(`http://localhost:3000/api/players/${player.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(player),
    });

    onSaved();
  }

  return (
    <>
      <h2>Edit Player</h2>

      <label>Select Team</label>
      <select value={teamId ?? ""} onChange={(e) => setTeamId(Number(e.target.value))}>
        <option value="">Choose...</option>
        {teams.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      {teamId && (
        <>
          <label>Select Player</label>
          <select value={playerId ?? ""} onChange={(e) => setPlayerId(Number(e.target.value))}>
            <option value="">Choose...</option>
            {players.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </>
      )}

      {player && (
        <>
          <label>Name</label>
          <input value={player.name} onChange={(e) => (player.name = e.target.value)} />

          <label>Skill</label>
          <input type="number" value={player.skill} onChange={(e) => (player.skill = Number(e.target.value))} />

          <label>Session WR</label>
          <input type="number" value={player.sessWR} onChange={(e) => (player.sessWR = Number(e.target.value))} />

          <label>Session PA</label>
          <input type="number" value={player.sessPA} onChange={(e) => (player.sessPA = Number(e.target.value))} />

          <label>Overall WR</label>
          <input type="number" value={player.overallWR} onChange={(e) => (player.overallWR = Number(e.target.value))} />

          <label>Overall MP</label>
          <input type="number" value={player.overallMP} onChange={(e) => (player.overallMP = Number(e.target.value))} />

          <button onClick={savePlayer}>Save Changes</button>
        </>
      )}
    </>
  );
}
