import styles from "../style/SingleTeamDisplay.module.css";

import type { Team } from "../models/Team";
import PlayerCardLarge from "./PlayerCardLarge";

interface Props {
  team: Team;
  possibleCombinations: number;
}

function SingleTeamDisplay({ team, possibleCombinations }: Props) {
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
              <p>{possibleCombinations}</p>
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
    </>
  );
}

export default SingleTeamDisplay;
