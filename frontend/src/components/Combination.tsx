import styles from "../style/Combination.module.css";

interface Props {
  ranks: Number[];
}

function Combination({ ranks }: Props) {
  return (
    <div className={styles.combination_container}>
      {ranks.map((rank, index) => (
        <div
          key={index}
          className={`${styles.rank_circle} ${
            index in [1, 2, 3] ? styles.highlighted : ""
          }`}
        >
          {rank.toFixed()}
        </div>
      ))}
    </div>
  );
}

export default Combination;
