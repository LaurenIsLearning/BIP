import { useState } from "react";
import { Player } from "../../models/Player";
//import PlayerSearch from "../PlayerSearch";

export default function EditPlayerPanel() {
  const [player, setPlayer] = useState<Player | null>(null);

  return (
    <div>
      <h2>Edit Player</h2>

      <PlayerSearch onSelect={setPlayer} />

      {player && (
        <>
          <h3>Editing: {player.name}</h3>

          <label>Name</label>
          <input value={player.name} />

          <label>Skill</label>
          <input value={player.skill} />

          <label>Session WR</label>
          <input value={player.sessWR} />

          <button style={{ marginTop: "10px" }}>Save Changes</button>
        </>
      )}
    </div>
  );
}
