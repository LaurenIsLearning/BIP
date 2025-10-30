import styles from "../style/ComparisonPage.module.css";

import type { Team } from "../models/Team";
import SingleTeamDisplay from "../components/SingleTeamDisplay";
import NavBar from "../components/NavBar";
interface Props {
  teamOne: Team;
  teamTwo?: Team;
}

function ComparisonPage({ teamOne, teamTwo }: Props) {
  if (!teamTwo) {
    //Display single team
    return (
      <div className={styles.root}>
        <NavBar />
        <SingleTeamDisplay team={teamOne} />
      </div>
    );
  }

  return (
    // Display both teams
    <div className={styles.root}>
      <NavBar />
      <SingleTeamDisplay team={teamOne} />
      <SingleTeamDisplay team={teamTwo} />
    </div>
  );
}

export default ComparisonPage;
