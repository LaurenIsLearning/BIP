import styles from "../style/StatsPage.module.css";

import { Team } from "../models/Team";
import { Player } from "../models/Player";
import PlayerCardLarge from "../components/PlayerCardLarge";
import CombinationContainer from "../components/CombinationContainer";
import useComCalc from "../hooks/useComCalc";
import { useEffect, useState } from "react";
import PlayerCardSmall from "../components/PlayerCardSmall";
import NavBar from "../components/NavBar";

function StatsPage() {
  const [team, setTeam] = useState<Team>();
  const teamNumber = 3; // Placeholder for team number

  useEffect(() => {
    // Rank Placeholder
    let index = 1;

    // Fetch team data from the backend
    fetch(`http://localhost:3000/api/team/${teamNumber}`)
      .then((response) => response.json())
      .then((data) => {
        const fetchedTeam = new Team(
          data.teamName,
          data.players.map(
            (p: Player) =>
              new Player(
                p.playerName,
                p.skillLevel,
                p.sessionWR,
                p.sessionPA,
                p.overallWR,
                p.overallMP,
                false
              )
          ),
          data.sessionPoints,
          data.ranking || index++
        );
        setTeam(fetchedTeam);
        setPlayers(fetchedTeam.players);
      });
  }, []);

  const [players, setPlayers] = useState<Player[]>([]);
  const [comboTotal, setComboTotal] = useState(0);

  const togglePlayed = (player: Player) => {
    if (!player.played) {
      if (comboTotal + player.skillLevel > 23) return; // Prevent toggling if it would exceed the combo total

      let currentlyPlayed = 0;
      for (const p of players) {
        if (p.played) currentlyPlayed++;
      }
      if (currentlyPlayed >= 5) return; // Prevent toggling if it would exceed the player limit
    }

    setPlayers((prevPlayers) =>
      prevPlayers.map((p) =>
        p.playerName === player.playerName ? { ...p, played: !p.played } : p
      )
    );
  };

  useEffect(() => {
    // Recalculate combo total from selected players
    let total = 0;
    for (const player of players) {
      if (player.played) {
        total += player.skillLevel;
      }
    }

    setComboTotal(total);
  }, [players]);

  const { count } = useComCalc(
    players.map((p) => p.skillLevel),
    players
      .map((p) => (p.played ? p.skillLevel : null))
      .filter((s) => s !== null) as number[]
  );

  if (!team) return <div>Loading...</div>;

  return (
    <>
      <NavBar />
      <div className={styles.top_half}>
        <div>
          <PlayerCardLarge
            key={players[0].playerName}
            player={players[0]}
            onTogglePlayed={togglePlayed}
          />
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
              <p>{count}</p>
            </div>
            <div className={styles.team_extras}>
              <p>Combo Point Total</p>
              <p>{comboTotal}</p>
            </div>
          </div>
        </div>
        <div>
          <PlayerCardLarge
            key={players[1].playerName}
            player={players[1]}
            onTogglePlayed={togglePlayed}
          />
          <p>Team Co-Captain</p>
        </div>
      </div>
      <div className={styles.bottom_half}>
        {players.map((player, index) =>
          index >= 2 ? (
            <PlayerCardSmall
              key={player.playerName}
              player={player}
              onTogglePlayed={togglePlayed}
            />
          ) : null
        )}
      </div>
      <CombinationContainer players={players} />
    </>
  );
}

export default StatsPage;
