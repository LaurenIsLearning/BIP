import { useEffect, useState } from "react";
import SelectTeamDropDown from "../SelectTeamDropDown";
import AddTeamForm from "./AddTeamForm";
import EditTeamForm from "./EditTeamForm";
import AddPlayerForm from "./AddPlayerForm";
import EditPlayerForm from "./EditPlayerForm";

import styles from "../../style/AdminContent.module.css";

import { Team } from "../../models/Team";
import { fetchAllTeams } from "../../services/TeamService";

interface Props {
    tool: "addTeam" | "editTeam" | "addPlayer" | "editPlayer";
}

export default function AdminContent({ tool }: Props) {
    const [teams, setTeams] = useState<Team[]>([]);

    // Load teams once
    useEffect(() => {
        fetchAllTeams().then((t) => setTeams(t));
    }, []);

    return (
        <div className={styles.panel}>
            {/* ADD TEAM */}
            {tool === "addTeam" && (
                <>
                    <h2>Add Team</h2>
                    <AddTeamForm
                        onSaved={() => {
                            fetchAllTeams().then(setTeams);
                        }}
                    />
                </>
            )}

            {/* EDIT TEAM */}
            {tool === "editTeam" && (
                <>
                    <h2>Edit Team</h2>
                    <p>Select a team to edit:</p>

                    <SelectTeamDropDown mode="stats" />

                    <EditTeamForm
                        teams={teams}
                        onSaved={() => fetchAllTeams().then(setTeams)}
                    />

                </>
            )}

            {/* ADD PLAYER */}
            {tool === "addPlayer" && (
                <>
                    <h2>Add Player</h2>
                    <p>Select a team to add a player to:</p>

                    <SelectTeamDropDown mode="stats" />

                    <AddPlayerForm
                        teams={teams}
                        onSaved={() => fetchAllTeams().then(setTeams)}
                    />
                </>
            )}

            {/* EDIT PLAYER */}
            {tool === "editPlayer" && (
                <>
                    <h2>Edit Player</h2>
                    <p>Select a team, then a player:</p>

                    <SelectTeamDropDown mode="stats" />

                    <EditPlayerForm
                        teams={teams}
                        onSaved={() => fetchAllTeams().then(setTeams)}
                    />
                </>
            )}
        </div>
    );
}
