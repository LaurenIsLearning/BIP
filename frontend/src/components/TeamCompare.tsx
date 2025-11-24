import type { Team } from "../models/Team";
import type { Player } from "../models/Player";
import styles from "../style/TeamCompare.module.css";
import { useEffect, useMemo, useState } from "react";
import useComCalc from "../hooks/useComCalc";
import CombinationContainer from "./CombinationContainer";
import PlayerCardSmall from "./PlayerCardSmall";
import { fetchTeam } from "../services/TeamService";
import SelectTeamDropDown from "./SelectTeamDropDown";

interface Props {
  teamId?: string;
  mode: string;
}

function TeamCompare({ teamId = "", mode }: Props) {
  const [team, setTeam] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [comboTotal, setComboTotal] = useState(0);

  useEffect(() => {
    fetchTeam(teamId).then((fetchedTeam) => {
      setTeam(fetchedTeam);
      setPlayers(fetchedTeam.players);
    });
  }, [teamId]);

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

  const skills = useMemo(() => players.map((p) => p.skillLevel), [players]);
  const playedSkills = useMemo(
    () => players.filter((p) => p.played).map((p) => p.skillLevel),
    [players]
  );

  const { count } = useComCalc(skills, playedSkills);

  if (!teamId || !team)
    return <SelectTeamDropDown selectedTeamId={teamId} mode={mode} />;

  return (
    <div className={styles.root}>
      <h3>{team.teamName}</h3>
      <div className={styles.team_header}>
        <div className={styles.info_container}>
          <p>Total Combos</p>
          <p>{count}</p>
        </div>
        <div className={styles.info_container}>
          <p>SL Total</p>
          <p>{comboTotal}</p>
        </div>
      </div>
      <div className={styles.players_container}>
        {players.map((player) => (
          <PlayerCardSmall
            key={player.playerName}
            player={player}
            onTogglePlayed={togglePlayed}
          />
        ))}
      </div>
      <CombinationContainer players={players} />
    </div>
  );
}

export default TeamCompare;
