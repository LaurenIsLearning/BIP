import { useState, useEffect } from "react";
import data from '../data/teams.json'; 


// Set up interface for teams (probably will not need this later)
interface Team {
      name: string;
      points: number;
      players: [
        {
            skill: number,
            name: string,
            sessWR: number,
            sessPA: number,
            overallWR: number,
            overallMP: number
        }
      ]
    }

function RankingsTable() {
    const [teams, setTeams] = useState<Team[]>([]);

    // Get info from teams data
    useEffect(() => {
            setTeams(data as Team[]); // Type assertion for safety
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
                    <tr>
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