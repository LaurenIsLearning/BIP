import styles from "../style/SingleTeamDisplay.module.css";

import type { Team } from "../models/Team";
import PlayerCardLarge from "./PlayerCardLarge";
import CombinationContainer from "./CombinationContainer";
import useComCalc from "../hooks/useComCalc";
import { useEffect } from "react";

interface Props {
  team: Team;
}

function SingleTeamDisplay({ team }: Props) {
  const [values, calculation] = useComCalc({
    allCombinations: [],
    remainingCombinations: [],
    count: 0,
  });

  useEffect(() => {
    const skills = team.players.map((p) => p.skillLevel);
    calculation("GET_COUNT", skills);
  }, [team]);

  return (
    <>
      <div className={styles.top_half}>
        <div>
          <PlayerCardLarge player={team.players[0]} />
          <p>Team Captain</p>
        </div>
        <div className={styles.team_info}>
          <p className={styles.team_name}>{team.teamName}</p>
          <div className={styles.team_extras_container}>
            <div className={styles.team_extras}>
              <p>Team Ranking</p>
              <p>{team.ranking}</p>
            </div>
            <div className={styles.team_extras}>
              <p>Possible Combinations</p>
              <p>{values.count}</p>
            </div>
          </div>
        </div>
        <div>
          <PlayerCardLarge player={team.players[1]} />
          <p>Team Co-Captain</p>
        </div>
      </div>
      <div className={styles.bottom_half}>
        {team.players.map((player, index) =>
          index >= 2 ? <PlayerCardLarge key={index} player={player} /> : null
        )}
      </div>
      <CombinationContainer team={team} />
    </>
  );
}

export default SingleTeamDisplay;
