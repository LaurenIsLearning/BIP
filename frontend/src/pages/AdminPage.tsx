import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Modal from "../components/Modal";
import styles from "../style/AdminPage.module.css";

// Admin Form Components
import AddTeamForm from "../components/admin/AddTeamForm";
import EditTeamForm from "../components/admin/EditTeamForm";
import AddPlayerForm from "../components/admin/AddPlayerForm";
import EditPlayerForm from "../components/admin/EditPlayerForm";

interface Player {
  id: number;
  name: string;
  skill: number;
  sessWR: number;
  sessPA: number;
  overallWR: number;
  overallMP: number;
}

interface Team {
  id: number;
  name: string;
  points: number;
}

type AdminAction = null | "addTeam" | "editTeam" | "addPlayer" | "editPlayer";

export default function AdminPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [action, setAction] = useState<AdminAction>(null);

  // Fetch teams
  async function fetchTeams() {
    try {
      const res = await fetch("http://localhost:3000/api/teams");
      const data = await res.json();
      setTeams(data);
    } catch (err) {
      console.error("Failed to fetch teams", err);
    }
  }

  // Fetch players when needed
  async function fetchPlayers(teamId: number) {
    const res = await fetch(`http://localhost:3000/api/teams/${teamId}/players`);
    setPlayers(await res.json());
  }

  useEffect(() => {
    fetchTeams();
  }, []);

  function closeAction() {
    setAction(null);
    setSelectedTeam(null);
  }

  return (
    <main className={styles.container}>
      <NavBar />

      {/* HEADER */}
      <header className={styles.header}>
        <h1>Admin Dashboard</h1>
      </header>

      {/* ADMIN ACTION BUTTONS */}
      <section className={styles.controls}>
        <button onClick={() => setAction("addTeam")}>Add Team</button>
        <button onClick={() => setAction("editTeam")}>Edit Team</button>
        <button onClick={() => setAction("addPlayer")}>Add Player</button>
        <button onClick={() => setAction("editPlayer")}>Edit Player</button>
      </section>

      {/* TEAM LIST SECTION */}
      <section className={styles.teamSection}>
        <h2>Teams</h2>

        <div className={styles.teamGrid}>
          {teams.map((team) => (
            <div key={team.id} className={styles.teamCard}>
              <h3>{team.name}</h3>
              <p className={styles.teamPoints}>{team.points} pts</p>

              <button
                className={styles.editButton}
                onClick={() => {
                  setSelectedTeam(team);
                  setAction("editTeam");
                }}
              >
                Edit Team
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ACTION MODALS */}
      {action === "addTeam" && (
        <Modal onClose={closeAction}>
          <AddTeamForm onSaved={fetchTeams} />
        </Modal>
      )}

      {action === "editTeam" && (
        <Modal onClose={closeAction}>
          <EditTeamForm teams={teams} onSaved={fetchTeams} />
        </Modal>
      )}

      {action === "addPlayer" && (
        <Modal onClose={closeAction}>
          <AddPlayerForm teams={teams} onSaved={fetchTeams} />
        </Modal>
      )}

      {action === "editPlayer" && (
        <Modal onClose={closeAction}>
          <EditPlayerForm teams={teams} onSaved={fetchTeams} />
        </Modal>
      )}
    </main>
  );
}
