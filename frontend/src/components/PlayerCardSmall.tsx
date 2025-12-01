import styles from "../style/PlayerCardSmall.module.css";
import arrow from "../assets/arrow.png";

import { useState } from "react";
import type { Player } from "../models/Player";

interface Props {
  player: Player; // Player object containing all relevant data
  onTogglePlayed: (player: Player) => void;
}

function PlayerCardSmall({ player, onTogglePlayed }: Props) {
  // Looks better without decimal places,
  const sessWRPer = (player.sessWR * 100).toFixed(0) + "%";
  const sessPAPer = (player.sessPA * 100).toFixed(0) + "%";
  const overallWRPer = (player.overallWR * 100).toFixed(0) + "%";

  const playerSplit = player.name.split(" ");
  const first = playerSplit[0];
  const lastInitial = playerSplit.length > 1 ? playerSplit[1][0] + "." : "";
  const shortenedName = `${first} ${lastInitial}`;

  const [showStatExtras, setShowStatExtras] = useState(false);
  const [showSessionStats, setShowSessionStats] = useState(true);

  return (
    <div
      className={`
  ${styles[`color_${player.skill}`]} 
  ${showStatExtras ? styles.extended : styles.collapsed}
  ${styles.player_card_small}
  ${player.played ? styles.played : ""}
`}
    >
      <div
        className={showStatExtras ? styles.content_extended : styles.content}
        onClick={() => onTogglePlayed(player)}
      >
        <div className={styles.player_name_and_sl}>
          <p className={styles.player_name}>{shortenedName}</p>
          <p>SL: {player.skill}</p>
        </div>
        {showStatExtras ? (
          <div className={styles.player_additional_stats}>
            {showSessionStats ? (
              <>
                <p onClick={() => setShowSessionStats(false)}>Session Stats</p>
                <div className={styles.stat_block}>
                  <p>WR: {sessWRPer}</p>
                  <p>PA: {sessPAPer}</p>
                </div>
              </>
            ) : (
              <>
                <p onClick={() => setShowSessionStats(true)}>Overall Stats</p>
                <div className={styles.stat_block}>
                  <p>WR: {overallWRPer}</p>
                  <p>MP: {player.overallMP}</p>
                </div>
              </>
            )}
          </div>
        ) : null}
      </div>
      <button
        className={showStatExtras ? "" : styles.rotated}
        onClick={() => setShowStatExtras(!showStatExtras)}
      >
        <img
          className={styles.arrow_icon}
          src={arrow}
          alt="Show More Stats"
          draggable={false}
        />
      </button>
    </div>
  );
}

export default PlayerCardSmall;
