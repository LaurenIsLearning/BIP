import styles from "../style/CombinationContainer.module.css";
import Combination from "./Combination";

import { Player } from "../models/Player";
import useComCalc from "../hooks/useComCalc";

interface Props {
  players: Player[];
}

function CombinationContainer({ players }: Props) {
  const skills = players.map((player) => player.skillLevel);
  const selectedSkills = players
    .filter((player) => player.played)
    .map((player) => player.skillLevel);

  const { combinations } = useComCalc(skills, selectedSkills);

  if (!players || players.length === 0)
    return <div>Loading combinations...</div>;

  return (
    <div className={styles.root}>
      <h3>Possible Combinations</h3>
      <section className={styles.combination_container}>
        {combinations.map((combo, index) => (
          <Combination key={index} ranks={combo} />
        ))}
      </section>
    </div>
  );
}

export default CombinationContainer;
