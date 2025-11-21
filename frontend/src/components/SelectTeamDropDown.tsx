import React, { useEffect, useState } from "react";
import { fetchAllTeams } from "../services/TeamService";
import { Team } from "../models/Team";

interface Props {
  setTeamId: React.Dispatch<React.SetStateAction<string>>;
}

function SelectTeamDropDown({ setTeamId }: Props) {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    fetchAllTeams().then((fetchedTeams) => {
      setTeams(fetchedTeams);
    });
  }, []);

  if (teams.length === 0) {
    return <p>Loading teams...</p>;
  }

  return (
    <select onChange={(e) => setTeamId(e.target.value)}>
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
