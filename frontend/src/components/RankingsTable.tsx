import { useState, useEffect } from "react";

// Set up interface for teams
interface Team {
    id: number;
    name: string;
    points: number;
}

function RankingsTable() {
    const [teams, setTeams] = useState<Team[]>([]);

    // Get info from teams data
    useEffect(() => {

        // Get the team data from the database
        const fetchTeams = async () => {
            const response = await fetch('http://localhost:3000/api/teams');
            const json = await response.json();

            if(response.ok) {
                setTeams(json as Team[]);
            }

            console.log(response)
        }

        fetchTeams();
    }, []);

    // Sort the list of teams in descending order
    const sortedTeams = [...teams].sort((a, b) => b.points - a.points);

    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Team Name</th>
                    <th>Team Points</th>
                </tr>
            </thead>
            <tbody>
                {sortedTeams.map((team, index) => (
                    <tr key={index}>
                        <th>{index + 1}</th>
                        <th>{team.name}</th>
                        <th>{team.points}</th>
                    </tr>
                ))}
            </tbody>
        </table>
        </>    
    )
}

export default RankingsTable;