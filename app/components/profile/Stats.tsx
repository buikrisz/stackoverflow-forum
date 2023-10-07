import styles from "./Stats.module.css";

export const Stats = () => {
  return (
    <div className={styles.statsSection}>
      <h2 className={styles.title}>Stats</h2>
      <div className={styles.content}>
        <div className={styles.item}>
          <h3>3000</h3>
          <h4>reputation</h4>
        </div>
        <div className={styles.item}>
          <h3>200k</h3>
          <h4>reached</h4>
        </div>
        <div className={styles.item}>
          <h3>200</h3>
          <h4>answers</h4>
        </div>
        <div className={styles.item}>
          <h3>15</h3>
          <h4>questions</h4>
        </div>
        <div className={styles.item}>
          <h3>ICON</h3>
          <h4>top % this year</h4>
        </div>
      </div>
    </div>
  );
};
