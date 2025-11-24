// admin page placeholder
/*
-navbar
-fetch all teams
-display list of teams
-small form to add a new team
-buttons to edit/delete each team

 entire admin logic
 team list
 team modal
 player modal
 modal UI component
*/

import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Modal from "../components/Modal";
import styles from "../style/AdminPage.module.css"

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

export default function AdminPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  
  //for modal
  const [teamForm, setTeamForm] = useState<Team | null>(null);
  const [playerForm, setPlayerForm] = useState<Player | null>(null);

  //to fetch------
  async function fetchTeams() {
    const res = await fetch("http://localhost:3000/api/teams");
    setTeams(await res.json());
  }
  async function fetchPlayers(teamId: number) {
    const res = await fetch(`http://localhost:3000/api/teams/${teamId}/players`);
    setPlayers(await res.json());
  }

  useEffect(() => {
    fetchTeams();
  }, []);

  // team editing module handling
  function openAddTeam() {
    setTeamForm({
      id: 0,
      name: "",
      points: 0,
    });
  }

  function openEditTeam(team: Team) {
    setSelectedTeam(team);
    setTeamForm({...team});
    fetchPlayers(team.id);
  }

  async function saveTeam() {
    if (!teamForm) return;
    const method = teamForm.id === 0 ? "POST" : "PUT";
    const url =
      method === "POST"
        ? "http://localhost:3000/api/teams"
        : `http://localhost:3000/api.teams/${teamForm.id}`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(teamForm),
    });

    setTeamForm(null);
    fetchTeams();
  }


  //player editing module handling
  function openAddPlayer() {
    if (!selectedTeam) return;

    setPlayerForm({
      id: 0,
      name: "",
      skill: 2,
      sessWR: 0,
      sessPA: 0,
      overallWR: 0,
      overallMP: 0,
    });
  }

  function openEditPlayer(player: Player) {
    setPlayerForm({ ...player });
  }

  async function savePlayer() {
    if (!playerForm || !selectedTeam) return;

    const method = playerForm.id === 0 ? "POST" : "PUT";
    const url =
      method === "POST"
        ? `http://localhost:3000/api/players/team/${selectedTeam.id}`
        : `http://localhost:3000/api/players/${playerForm.id}`;

    await fetch(url, {
      method,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(playerForm),
    });

    setPlayerForm(null);
    fetchPlayers(selectedTeam.id);
  }

  async function deletePlayer(id:number){
    await fetch(`http://localhost:3000/api/players/${id}`, { method: "DELETE" });
    if (selectedTeam) fetchPlayers(selectedTeam.id);
  }

  //rendering of page-------
  return (
    <main className={styles.container}>
      <NavBar />

      <header className={styles.header}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <button className={styles.addButton} onClick={openAddTeam}>
          + Add Team
        </button>
      </header>

      <section className={styles.teamList}>
        <h2 className={styles.sectionTitle}>Teams</h2>
        <ul className={styles.teamItems}>
          {teams.map((team) =>(
            <li key={team.id} className={styles.teamItem}>
              <article className={styles.teamCard}>
                <header className={styles.teamHeader}>
                  <h3>{team.name}</h3>
                  <span className={styles.points}>{team.points} pts</span>
                </header>

                <footer className={styles.teamActions}>
                  <button onClick={() => openEditTeam(team)} className={styles.editButton}>
                    Edit Team
                  </button>
                </footer>
              </article>
            </li>
          ))}
        </ul>
      </section>
      
      {/* team modal */}
      {teamForm && (
        <Modal onClose={() => setTeamForm(null)}>
          <h2>{teamForm.id === 0 ? "Add Team":"Edit Team"}</h2>

          <label>Team Name</label>
          <input
            value={teamForm.name}
            onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
          />

          <label>Points</label>
          <input
            type="number"
            value={teamForm.points}
            onChange={(e) => setTeamForm({ ...teamForm, points: Number(e.target.value) })}
          />

          <button className={styles.saveButton} onClick={saveTeam}>
            Save
          </button>

          {teamForm.id !== 0 && selectedTeam && (
            <section className={styles.playerSection}>
              <header className={styles.playerHeader}>
                <h3>Players</h3>
                <button onClick={openAddPlayer} className={styles.addPlayerButton}>
                  + Add Player
                </button>
              </header>

              <ul className={styles.playerList}>
                {players.map((p) => (
                  <li key={p.id} className={styles.playerItem}>
                    <article className={styles.playerCard}>
                      <h4>{p.name}</h4>
                      <p>Skill: {p.skill}</p>
                      <footer className={styles.playerActions}>
                        <button onClick={() => openEditPlayer(p)}>Edit</button>
                        <button onClick={() => deletePlayer(p.id)}>Delete</button>
                      </footer>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </Modal>
      )}

      {/* player modal */}
      {playerForm && (
        <Modal onClose={() => setPlayerForm(null)}>
          <h2>{playerForm.id === 0 ? "Add Player":"Edit Player"}</h2>
          
          <label>Name</label>
          <input
            value={playerForm.name}
            onChange={(e) => setPlayerForm({...playerForm, name:e.target.value })}
          />

          <label>Skill</label>
          <input
            type="number"
            value={playerForm.skill}
            onChange={(e) => setPlayerForm({...playerForm, skill: Number(e.target.value)})}
          />

          <label>Session Win Rate</label>
          <input
            type="number"
            value={playerForm.sessWR}
            onChange={(e) => setPlayerForm({...playerForm, sessWR: Number(e.target.value)})}
          />

          <label>Session PA</label>
          <input
            type="number"
            value={playerForm.sessPA}
            onChange={(e) => setPlayerForm({...playerForm, sessPA: Number(e.target.value)})}
          />

          <label>Overall Match Points</label>
          <input
            type="number"
            value={playerForm.overallMP}
            onChange={(e) => setPlayerForm({...playerForm, overallMP: Number(e.target.value)})}
          />
          
          <button className={styles.saveButton} onClick={savePlayer}>
            Save Player
          </button>
        </Modal>
      )}
    </main>
  );
}
