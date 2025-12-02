//import "../style/HomePage.css"
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import AdminMenuBar from "../components/AdminMenuBar";
import AdminHomePanel from "../components/AdminHomePanel";
import AdminManageTeamsPanel from "../components/AdminManageTeamsPanel";
import AdminEditTeamPanel from "../components/AdminEditTeamPanel";
import Footer from "../components/Footer";

import { Team } from "../models/Team"
import { fetchAllTeams } from "../services/TeamService";
import { fetchTeam } from "../services/TeamService";


function AdminPage() {
    const [activePanel, setActivePanel] = useState("home");
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

    //to load teams from BE
    useEffect(() => {
        fetchAllTeams()
            .then(data => {
                setTeams(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load teams:", err);
                setLoading(false);
            });
    }, []);

    const startEditingTeam = async (teamId: string) => {
        try {
            const fullTeam = await fetchTeam(teamId); //loads players too
            setSelectedTeam(fullTeam)
            setActivePanel("edit-team");
        } catch (err) {
            console.error("failed to load team", err);
        }
    };

    return (
        <>
            {/* menu bars */}
            <NavBar />
            <AdminMenuBar onSelect={setActivePanel} active={activePanel} />

            {/* panel setup */}
            <main style={{ padding: ".5rem" }}>
                {/* home */}
                {activePanel === "home" && <AdminHomePanel />}
                {/* manage teams */}
                {activePanel === "manage-teams" && (
                    loading ? (
                        <p>Loading teams...</p>
                    ) : (
                        <AdminManageTeamsPanel
                            teams={teams}
                            onSelectTeam={(teamId) => startEditingTeam(teamId)}
                        />
                    )
                )}
                {/* edit team part of manage team */}
                {activePanel === "edit-team" &&
                    selectedTeam && (
                        <AdminEditTeamPanel
                            team={selectedTeam}
                            onBack={() => setActivePanel("manage-teams")}
                        />
                    )}
            </main>


            <Footer />
        </>
    )
}

export default AdminPage;