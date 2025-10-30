import styles from "../style/CombinationContainer.module.css";
import Combination from "./Combination";

import { Team } from "../models/Team";
import useComCalc from "../hooks/useComCalc";
import { useEffect } from "react";

interface Props {
  team: Team;
}

function CombinationContainer({ team }: Props) {
  const [values, calculation] = useComCalc({
    allCombinations: [],
    remainingCombinations: [],
  });

  const skills = team.players.map((player) => player.skillLevel);
  const selectedSkills = team.players
    .filter((player) => player.played)
    .map((player) => player.skillLevel);

  // Recalculate when team or played flags are changed
  useEffect(() => {
    calculation("GET_ALL", skills);
    calculation("GET_FILTERED", { skills, selectedSkills });
  }, [team]);

  // Create a set of possible combinations for quick lookup
  const possibleSet = new Set(
    values.remainingCombinations.map((combo) => combo.join("-"))
  );

  // Check if a combination is possible
  const isPossibleCombo = (combo: number[]) => {
    const key = combo.join("-");
    return possibleSet.has(key);
  };

  return (
    <div className={styles.root}>
      <h1>Possible Combinations</h1>
      <section className={styles.combination_container}>
        {values.allCombinations.map((combo, index) => (
          <Combination
            key={index}
            ranks={combo}
            possible={isPossibleCombo(combo)}
          />
        ))}
      </section>
    </div>
  );
}

export default CombinationContainer;
