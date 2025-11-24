import styles from "../style/ComparisonPage.module.css";

import TeamCompare from "../components/TeamCompare";
import NavBar from "../components/NavBar";

import { useParams } from "react-router-dom";
import SelectTeamDropDown from "../components/SelectTeamDropDown";

function ComparisonPage() {
  const { teamOneId, teamTwoId } = useParams<{
    teamOneId: string;
    teamTwoId: string;
  }>();

  if (!teamOneId) {
    return (
      <div className={styles.root}>
        <NavBar />
        <div className={styles.no_id}>
          <p>Please select the first team to compare:</p>
          <SelectTeamDropDown
            selectedTeamId={teamOneId}
            mode="compareTeamOne"
          />
        </div>
      </div>
    );
  }

  return (
    // Display both teams
    <div className={styles.root}>
      <NavBar />
      <div className={styles.content_container}>
        <TeamCompare teamId={teamOneId} mode="compareTeamOne" />
        <TeamCompare teamId={teamTwoId} mode="compareTeamTwo" />
      </div>
    </div>
  );
}

export default ComparisonPage;
