import { useEffect, useState } from "react";
import { fetchAllTeams } from "../services/TeamService";
import { Team } from "../models/Team";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../style/SelectTeamDropdown.module.css";

interface Props {
  selectedTeamId?: string;
  mode: string;
}

function SelectTeamDropDown({ selectedTeamId = "", mode }: Props) {
  const [teams, setTeams] = useState<Team[]>([]);
  const navigate = useNavigate();
  const { teamOneId, teamTwoId } = useParams<{
    teamOneId: string;
    teamTwoId: string;
  }>();

  const showTeamStats = (teamId?: string) => {
    if (!teamId) return;

    if (mode === "stats") {
      navigate(`/Stats/${teamId}`);
    } else if (mode === "compareTeamOne") {
      navigate(`/Comparison/${teamId}/${teamTwoId || ""}`);
    } else if (mode === "compareTeamTwo") {
      navigate(`/Comparison/${teamOneId || ""}/${teamId}`);
    }
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
      className={styles.select}
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
