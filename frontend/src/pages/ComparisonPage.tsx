import styles from "../style/ComparisonPage.module.css";

import type { Team } from "../models/Team";
import TeamCompare from "../components/TeamCompare";
import NavBar from "../components/NavBar";
interface Props {
  teamOne: Team;
  teamTwo: Team;
}

function ComparisonPage({ teamOne, teamTwo }: Props) {
  return (
    // Display both teams
    <div className={styles.root}>
      <NavBar />
      <div className={styles.content_container}>
        <TeamCompare team={teamOne} />
        <TeamCompare team={teamTwo} />
      </div>
    </div>
  );
}

export default ComparisonPage;
