import { useState } from "react";
import { Team } from "../../models/Team";
import TeamPicker from "../TeamPicker";

export default function EditTeamPanel() {
  const [team, setTeam] = useState<Team | null>(null);

  return (
    <div>
      <h2>Edit Team</h2>

      <TeamPicker onSelect={setTeam} />

      {team && (
        <>
          <h3>Editing: {team.name}</h3>

          <label>Team Name</label>
          <input value={team.name} />

          <h4>Players:</h4>
          <ul>
            {team.players.map((p) => (
              <li key={p.playerId}>
                {p.name} (SL {p.skill})
              </li>
            ))}
          </ul>

          <button style={{ marginTop: "10px" }}>Save Changes</button>
        </>
      )}
    </div>
  );
}
