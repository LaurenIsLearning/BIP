import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchAllTeams } from "../services/TeamService";
import { Team } from "../models/Team";

function RankingsTable() {
  const [teams, setTeams] = useState<Team[]>([]);
  const navigate = useNavigate();

  // Navigate to stats page with team ID
  const navigateToStats = (teamId: string) => {
    navigate(`/Stats/${teamId}`);
  };

  // set update when url changes
  const location = useLocation();

  // Get info from teams data
  useEffect(() => {
    fetchAllTeams().then((fetchedTeams) => {
      setTeams(fetchedTeams);
    });
  }, [location]);

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
            <tr
              key={index}
              data-testid={`team-row-${team.name}`}
              onClick={() => navigateToStats(team.teamId)}
            >
              <th>{team.ranking}</th>
              <th>{team.name}</th>
              <th>{team.points}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default RankingsTable;
