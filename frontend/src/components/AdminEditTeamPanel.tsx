import { useState } from "react";
import styles from "../style/AdminEditTeamPanel.module.css";
import { Team } from "../models/Team";
import { Player } from "../models/Player";

type Props = {
    team: Team;
    onBack?: () => void;
    onRefresh?: () => void;
};

function AdminEditTeamPanel({ team, onBack, onRefresh }: Props) {
    //--player editable fields
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [formData, setFormData] = useState<Player | null>(null);

    //---team editable fields
    const [teamForm, setTeamForm] = useState({
        name: team.name,
        points: team.points
    });

    //---create new blank player
    function createBlankPlayer(): Player {
        return {
            playerId: crypto.randomUUID(),
            name: "",
            skill: 2,
            sessWR: 0,
            sessPA: 0,
            overallWR: 0,
            overallMP: 0,
            played: false,
            canBePlayed: true,
        };
    }

    //reset team fields to OG
    function handleResetTeam() {
        setTeamForm({
            name: team.name,
            points: team.points
        });
    }
    //reset player fields to OG
    function handleResetPlayer() {
        if (!selectedPlayer) return;
        setFormData({ ...selectedPlayer });
    }

    //--save team only
    async function handleSaveTeam() {
        const response = await fetch("https://bip-backend.fly.dev/api/teams/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                teamId: team.teamId,
                name: teamForm.name,
                points: teamForm.points
            })
        });

        if (!response.ok) {
            alert("Failed to update team.");
            return;
        }

        alert("Team updated!");
        onRefresh?.();
    }

    //---save player only
    async function handleSavePlayer(e: React.FormEvent) {
        e.preventDefault();
        if (!formData) return;

        const response = await fetch("https://bip-backend.fly.dev/api/players/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                teamId: team.teamId,
                player: formData
            })
        });

        if (!response.ok) {
            alert("Failed to update player.");
            return;
        }

        alert("Player updated!");
        onRefresh?.();
    }

    return (
        <>
            {/* Team info */}
            <section className={styles.panelContainer}>
                <p className={styles.subText}>
                    Editing team: <br />
                    <strong>{team.name}</strong>
                </p>

                <fieldset className={styles.fieldset}>
                    <div className={styles.editForm}>
                        <legend className={styles.legend}>Team Information</legend>
                        <div className={styles.teamFormWrapper}>
                            <div className={styles.editForm}>

                                <label className={styles.label}>
                                    Team Name:
                                    <input
                                        className={styles.input}
                                        type="text"
                                        value={teamForm.name}
                                        onChange={(e) =>
                                            setTeamForm({ ...teamForm, name: e.target.value })
                                        }
                                    />
                                </label>

                                <label className={styles.label}>
                                    Points:
                                    <input
                                        className={styles.input}
                                        type="number"
                                        value={teamForm.points}
                                        onChange={(e) =>
                                            setTeamForm({ ...teamForm, points: Number(e.target.value) })
                                        }
                                    />
                                </label>

                                {/* team buttons */}
                                <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                                    <button className={styles.saveButton} onClick={handleSaveTeam}>
                                        Save Team
                                    </button>

                                    <button className={styles.resetButton} onClick={handleResetTeam}>
                                        Reset Team
                                    </button>

                                    <button
                                        className={styles.deleteButton}
                                        onClick={async () => {
                                            if (!confirm("Are you sure you want to DELETE this team and all its players?"))
                                                return;

                                            const response = await fetch(`https://bip-backend.fly.dev/api/teams/${team.teamId}`, {
                                                method: "DELETE"
                                            });

                                            if (!response.ok) {
                                                alert("Failed to delete team");
                                                return;
                                            }

                                            alert("Team deleted!");
                                            onBack?.();
                                        }}
                                    >
                                        Delete Team
                                    </button>
                                </div>
                            </div>    </div>
                    </div>
                </fieldset>

            </section>

            {/* Player edit section */}
            <h2 className={styles.heading}>Players List:</h2>

            <section className={styles.editGrid}>
                {/* LEFT PLAYER PANEL */}
                <aside className={styles.playerList}>
                    <ul>
                        <li
                            className={styles.playerItem}
                            onClick={() => {
                                const blank = createBlankPlayer();
                                setSelectedPlayer(blank);
                                setFormData(blank);
                            }}
                        >
                            + Add New Player
                        </li>

                        {team.players.map((player) => (
                            <li
                                key={player.playerId}
                                className={
                                    selectedPlayer?.playerId === player.playerId
                                        ? styles.playerItemSelected
                                        : styles.playerItem
                                }
                                onClick={() => {
                                    setSelectedPlayer(player);
                                    setFormData({ ...player });
                                }}
                            >
                                <strong>{player.name}</strong> - Skill: {player.skill}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* RIGHT PLAYER EDITOR SIDE */}
                <main className={styles.editorPanel}>
                    {!selectedPlayer && (
                        <p className={styles.placeholderText}>
                            Select a player from the list to edit.
                        </p>
                    )}

                    {selectedPlayer && formData && (
                        <form className={styles.editForm} onSubmit={handleSavePlayer}>
                            <p className={styles.subText}>
                                Editing player:
                                <br />
                                <strong>{formData.name}</strong>
                            </p>
                            <br />
                            <label>
                                Name:
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                />
                            </label>

                            <label>
                                Skill (2-7):
                                <input
                                    type="number"
                                    min={2}
                                    max={7}
                                    value={formData.skill}
                                    onChange={(e) =>
                                        setFormData({ ...formData, skill: Number(e.target.value) })
                                    }
                                />
                            </label>

                            <label>
                                Session Win Rate (%):
                                <input
                                    type="number"
                                    step="0.1"
                                    value={formData.sessWR * 100}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            sessWR: Number(e.target.value) / 100
                                        })
                                    }
                                />
                            </label>

                            <label>
                                Session Point Average (%):
                                <input
                                    type="number"
                                    step="0.1"
                                    value={formData.sessPA * 100}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            sessPA: Number(e.target.value) / 100
                                        })
                                    }
                                />
                            </label>

                            <label>
                                Overall Win Rate (%):
                                <input
                                    type="number"
                                    step="0.1"
                                    value={formData.overallWR * 100}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            overallWR: Number(e.target.value) / 100
                                        })
                                    }
                                />
                            </label>

                            <label>
                                Overall Matches Played:
                                <input
                                    type="number"
                                    value={formData.overallMP}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            overallMP: Number(e.target.value)
                                        })
                                    }
                                />
                            </label>
                            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                                {/* player buttons */}
                                <button type="submit"
                                    className={styles.saveButton}>
                                    Save Changes
                                </button>

                                <button
                                    type="button"
                                    className={styles.resetButton}
                                    onClick={handleResetPlayer}
                                >
                                    Reset Player
                                </button>

                                <button
                                    type="button"
                                    className={styles.deleteButton}
                                    onClick={async () => {
                                        if (!selectedPlayer) return;

                                        if (!confirm(`Delete player "${selectedPlayer.name}"?`)) return;

                                        const response = await fetch(
                                            `https://bip-backend.fly.dev/api/players/${selectedPlayer.playerId}`,
                                            { method: "DELETE" }
                                        );

                                        if (!response.ok) {
                                            alert("Failed to delete player");
                                            return;
                                        }

                                        alert("Player deleted!");
                                        onBack?.();
                                    }}
                                >
                                    Delete Player
                                </button>
                            </div>


                        </form>
                    )}
                </main>
            </section>

            <button className={styles.backButton} onClick={onBack}>
                ⬅ Back to Manage Teams
            </button>
        </>
    );
}

export default AdminEditTeamPanel;
