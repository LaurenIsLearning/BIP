import styles from "../style/Combination.module.css";

interface Props {
  ranks: number[];
}

function Combination({ ranks }: Props) {
  return (
    <div className={styles.combination_container}>
      {ranks.map((rank, index) => (
        <div
          key={index}
          className={`${styles.rank_circle}
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
