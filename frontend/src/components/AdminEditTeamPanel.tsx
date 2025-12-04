import { useState } from "react";
import styles from "../style/AdminEditTeamPanel.module.css";
import { Team } from "../models/Team";
import { Player } from "../models/Player";

type Props = {
    team: Team;
    onBack?: () => void;
};

function AdminEditTeamPanel({ team, onBack }: Props) {
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [formData, setFormData] = useState<Player | null>(null);

    //to update player
    async function handleSave(e: React.FormEvent) {
        e.preventDefault(); //stop page reload after save
        if (!formData) return;
        console.log("Saving player:", formData);

        const response = await fetch("http://localhost:3001/api/players/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                teamId: team.teamId,
                player: formData
            }),
        });

        if (!response.ok) {
            alert("Failed to update player");
            return;
        }

        alert("Player saved!");

        //refresh page or reload team from backend
        onBack?.();
    }

    return (
        <>
            <section className={styles.panelContainer}>
                {/* <h1 className={styles.heading}>Edit Team</h1> */}

                {/* Team info */}

                <p className={styles.subText}>
                    You are now editing team: <br />
                    <strong>{team.name}</strong>.
                </p>

                <fieldset className={styles.fieldset}>
                    <legend className={styles.legend}>Team Information</legend>

                    <label className={styles.label}>
                        Team Name:
                        <input className={styles.input} type="text" value={team.name} readOnly />
                    </label>

                    <label className={styles.label}>
                        Points:
                        <input className={styles.input} type="number" value={team.points} readOnly />
                    </label>
                </fieldset>
            </section>

            {/* Player edit section */}
            <h2 className={styles.heading}>Players</h2>

            <section className={styles.editGrid}>
                {/* LEFT PLAYER PANEL */}
                <aside className={styles.playerList}>
                    <ul>
                        {/* add player selection */}
                        <li
                            className={styles.playerItem}
                            onClick={() => {
                                const blankPlayer: Player = {
                                    playerId: crypto.randomUUID(),
                                    name: "",
                                    skill: 1,
                                    sessWR: 0,
                                    sessPA: 0,
                                    overallWR: 0,
                                    overallMP: 0,
                                    played: false
                                };
                                setSelectedPlayer(blankPlayer);
                                setFormData(blankPlayer);
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
                </aside >

                {/* RIGHT PLAYER EDITOR SIDE */}
                < main className={styles.editorPanel} >
                    {!selectedPlayer && (
                        <p className={styles.placeholderText}>
                            Select a player from the list to edit.
                        </p>
                    )
                    }

                    {
                        selectedPlayer && (
                            <form className={styles.editForm} onSubmit={handleSave}>
                                <h3 className={styles.editTitle}>
                                    Editing {formData?.name || "New Player"}
                                </h3>

                                <label>
                                    Name:
                                    <input
                                        type="text"
                                        value={formData?.name ?? ""}
                                        onChange={(e) => setFormData({ ...formData!, name: e.target.value })}
                                    />
                                </label>

                                <label>
                                    Skill:
                                    <input
                                        type="number"
                                        value={formData?.skill ?? ""}
                                        onChange={(e) => setFormData({ ...formData!, skill: Number(e.target.value) })}
                                    />
                                </label>

                                <label>
                                    Matches Played:
                                    <input
                                        type="number"
                                        value={formData?.overallMP ?? ""}
                                        onChange={(e) => setFormData({ ...formData!, overallMP: Number(e.target.value) })}
                                    />
                                </label>

                                <button type="submit" className={styles.saveButton}>
                                    Save Changes
                                </button>
                            </form>
                        )
                    }
                </main >
            </section >

            <button className={styles.backButton} onClick={onBack}>
                ⬅ Back to Manage Teams
            </button>
        </>
    );
}

export default AdminEditTeamPanel;
