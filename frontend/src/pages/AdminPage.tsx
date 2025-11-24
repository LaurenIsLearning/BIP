import { useState } from "react";
//import TeamSelector from "../components/TeamSelector";
//import PlayerSearch from "../components/PlayerSearch";
import AddTeamForm from "../components/admin/AddTeamForm";
import AddPlayerForm from "../components/admin/AddPlayerForm";
import EditTeamPanel from "../components/admin/EditTeamPanel";
import EditPlayerPanel from "../components/admin/EditPlayerPanel";

type Panel =
  | "addTeam"
  | "editTeam"
  | "addPlayer"
  | "editPlayer"
  | null;

export default function AdminPage() {
  const [panel, setPanel] = useState<Panel>(null);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* LEFT SIDEBAR */}
      <aside style={{ width: "240px", padding: "1rem", borderRight: "1px solid #ccc" }}>
        <h3>Admin Options</h3>

        <button onClick={() => setPanel("addTeam")}>Add Team</button>
        <button onClick={() => setPanel("editTeam")}>Edit Team</button>

        <hr />

        <button onClick={() => setPanel("addPlayer")}>Add Player</button>
        <button onClick={() => setPanel("editPlayer")}>Edit Player</button>
      </aside>

      {/* RIGHT CONTENT */}
      <main style={{ flex: 1, padding: "1rem" }}>
        {!panel && <p>Select an action from the menu.</p>}

        {panel === "addTeam" && <AddTeamForm />}

        {panel === "editTeam" && <EditTeamPanel />}

        {panel === "addPlayer" && <AddPlayerForm />}

        {panel === "editPlayer" && <EditPlayerPanel />}
      </main>
    </div>
  );
}
