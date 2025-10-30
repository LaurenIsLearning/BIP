import styles from "../style/Combination.module.css";

interface Props {
  ranks: Number[];
  possible: boolean;
}

function Combination({ ranks, possible }: Props) {
  return (
    <div className={styles.combination_container}>
      {ranks.map((rank, index) => (
        <div
          key={index}
          className={`${styles.rank_circle} ${
            !possible ? styles.disabled : ""
          } ${styles[`color_${rank}`]}
          `}
        >
          {rank.toFixed()}
        </div>
      ))}
    </div>
  );
}

export default Combination;
