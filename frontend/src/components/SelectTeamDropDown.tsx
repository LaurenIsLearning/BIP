import React, { useEffect, useState } from "react";
import { fetchAllTeams } from "../services/TeamService";
import { Team } from "../models/Team";
import { useNavigate } from "react-router-dom";

interface Props {
  selectedTeamId: string;
}

function SelectTeamDropDown({ selectedTeamId }: Props) {
  const [teams, setTeams] = useState<Team[]>([]);
  const navigate = useNavigate();

  const showTeamStats = (teamId?: string) => {
    if (!teamId) return;
    navigate(`/Stats/${teamId}`);
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
  };

  useEffect(() => {
    fetchAllTeams().then((fetchedTeams) => {
      setTeams(fetchedTeams);
    });
  }, []);

  if (teams.length === 0) {
    return <p>Loading teams...</p>;
  }

  return (
    <select
      onChange={(e) => showTeamStats(e.target.value)}
      value={selectedTeamId || ""}
    >
      <option value="">Select a team</option>
      {teams.map((team) => (
        <option key={team.teamName} value={team.teamId}>
          {team.teamName}
        </option>
      ))}
    </select>
  );
}

export default SelectTeamDropDown;
