import styles from "../style/PlayerCardLarge.module.css";
import image from "../assets/ryan_temp_image.jpeg";

import type { Player } from "../models/Player";

interface Props {
  player: Player; // Player object containing all relevant data
}

function PlayerCardLarge({ player }: Props) {
  // Looks better without decimal places,
  const sessionWRPer = (player.sessionWR * 100).toFixed(0) + "%";
  const sessionPAPer = (player.sessionPA * 100).toFixed(0) + "%";
  const overallWRPer = (player.overallWR * 100).toFixed(0) + "%";
  return (
    <div className={styles.player_card}>
      <div className={styles.top_half}>
        <img
          src={image} // Eventually given image of player
          alt={player.playerName}
          className={styles.player_image}
        ></img>
        <p className={styles.skill_level}>SL: {player.skillLevel}</p>
      </div>
      <div className={styles.bottom_half}>
        <p className={styles.player_name}>{player.playerName}</p>
        <div className={styles.stats_header}>
          <p>WR</p>
          <p>Session</p>
          <p>PA</p>
        </div>
        <div className={styles.stats_display}>
          <p>{sessionWRPer}</p>
          <p></p>
          <p>{sessionPAPer}</p>
        </div>
        <div className={styles.stats_header}>
          <p>WR</p>
          <p>Overall</p>
          <p>MP</p>
        </div>
        <div className={styles.stats_display}>
          <p>{overallWRPer}</p>
          <p></p>
          <p>{player.overallMP}</p>
        </div>
      </div>
    </div>
  );
}

export default PlayerCardLarge;
