import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllTeams } from "../services/TeamService";
import { Team } from "../models/Team";

function RankingsTable() {
  const [teams, setTeams] = useState<Team[]>([]);
  const navigate = useNavigate();

  // Navigate to stats page with team ID
  const navigateToStats = (teamId: string) => {
    navigate(`/Stats/${teamId}`);
  };

  // Get info from teams data
  useEffect(() => {
    fetchAllTeams().then((fetchedTeams) => {
      setTeams(fetchedTeams);
    });
  }, []);

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
          {teams.map((team, index) => (
            <tr key={index} onClick={() => navigateToStats(team.teamId)}>
              <th>{team.ranking || index + 1}</th>{" "}
              {/* Fallback index until ^ rank is populated later */}
              <th>{team.teamName}</th>
              <th>{team.sessionPoints}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default RankingsTable;
