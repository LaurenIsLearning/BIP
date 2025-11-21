import styles from "../style/ComparisonPage.module.css";

import { Team } from "../models/Team";
import { Player } from "../models/Player";
import TeamCompare from "../components/TeamCompare";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
interface Props {
  teamOneId: string;
  teamTwoId: string;
}

function ComparisonPage({ teamOneId, teamTwoId }: Props) {
  const [teamOne, setTeamOne] = useState<Team>();
  const [teamTwo, setTeamTwo] = useState<Team>();

  useEffect(() => {
    let index = 1;

    // Fetch Team One
    fetch(`http://localhost:3000/api/teams/${teamOneId}`)
      .then((response) => response.json())
      .then((data) => {
        const fetchedTeam = new Team(
          data.name,
          data.players.map(
            (p: any) =>
              new Player(
                p.name,
                p.skill,
                p.sesswr,
                p.sesspa,
                p.overallwr,
                p.overallmp,
                false
              )
          ),
          data.points,
          data.ranking || index++
        );

        setTeamOne(fetchedTeam);

        // Fetch Team Two
        return fetch(`http://localhost:3000/api/teams/${teamTwoId}`);
      })
      .then((response) => response.json())
      .then((data) => {
        const fetchedTeam = new Team(
          data.name,
          data.players.map(
            (p: any) =>
              new Player(
                p.name,
                p.skill,
                p.sesswr,
                p.sesspa,
                p.overallwr,
                p.overallmp,
                false
              )
          ),
          data.points,
          data.ranking || index++
        );

        setTeamTwo(fetchedTeam);
      });
  }, [teamOneId, teamTwoId]);

  if (!teamOne || !teamTwo) {
    return <div>Loading...</div>;
  }

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
