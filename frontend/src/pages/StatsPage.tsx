import styles from "../style/StatsPage.module.css";

import { Team } from "../models/Team";
import { Player } from "../models/Player";
import PlayerCardLarge from "../components/PlayerCardLarge";
import CombinationContainer from "../components/CombinationContainer";
import useComCalc from "../hooks/useComCalc";
import { useEffect, useState } from "react";
import PlayerCardSmall from "../components/PlayerCardSmall";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import { fetchTeam } from "../services/TeamService";
import SelectTeamDropDown from "../components/SelectTeamDropDown";

function StatsPage() {
  const [team, setTeam] = useState<Team>();
  // set initial id from url if it exists
  const { teamId } = useParams<{ teamId: string }>();

  useEffect(() => {
    if (!teamId) return;

    fetchTeam(teamId).then((fetchedTeam) => {
      setTeam(fetchedTeam);
      setPlayers(fetchedTeam.players);
    });
  }, [teamId]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [comboTotal, setComboTotal] = useState(0);

  const togglePlayed = (player: Player) => {
    if (!player.played) {
      if (comboTotal + player.skill > 23) return; // Prevent toggling if it would exceed the combo total

      let currentlyPlayed = 0;
      for (const p of players) {
        if (p.played) currentlyPlayed++;
      }
      if (currentlyPlayed >= 5) return; // Prevent toggling if it would exceed the player limit
    }

    setPlayers((prevPlayers) =>
      prevPlayers.map((p) =>
        p.playerId === player.playerId ? { ...p, played: !p.played } : p
      )
    );
  };

  useEffect(() => {
    // Recalculate combo total from selected players
    let total = 0;
    for (const player of players) {
      if (player.played) {
        total += player.skill;
      }
    }

    setComboTotal(total);
  }, [players]);

  const { count } = useComCalc(
    players.map((p) => p.skill),
    players
      .map((p) => (p.played ? p.skill : null))
      .filter((s) => s !== null) as number[]
  );

  if (!teamId || teamId === "")
    return (
      <>
        <NavBar />
        <div className={styles.no_id}>
          <p>Please select a team to view statistics:</p>
          <SelectTeamDropDown selectedTeamId={teamId} mode="stats" />
        </div>
      </>
    );

  if (!team) return <div>Loading...</div>;

  return (
    <>
      <NavBar />
      <div className={styles.top_half}>
        <div>
          <PlayerCardLarge
            key={players[0].name}
            player={players[0]}
            onTogglePlayed={togglePlayed}
          />
          <p>Team Captain</p>
        </div>
        <div className={styles.team_info}>
          <p className={styles.team_name}>{team.name}</p>
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
            key={players[1].name}
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
              key={player.name}
              player={player}
              onTogglePlayed={togglePlayed}
            />
          ) : null
        )}
      </div>
      <CombinationContainer players={players} />
      <div className={styles.has_id}>
        <p>View stats for another team:</p>
        <SelectTeamDropDown selectedTeamId={teamId} mode="stats" />
      </div>
    </>
  );
}

export default StatsPage;
