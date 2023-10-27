import { BadgeType } from "@/app/types";
import { BadgeBox } from "./BadgeBox";
import styles from "./Badges.module.css";

export const Badges = () => {
  return (
    <div className={styles.badgesSection}>
      <h2 className={styles.title}>Badges</h2>
      <div className={styles.content}>
        <BadgeBox type={BadgeType.Gold} />
        <BadgeBox type={BadgeType.Silver} />
        <BadgeBox type={BadgeType.Bronze} />
      </div>
    </div>
  );
};
