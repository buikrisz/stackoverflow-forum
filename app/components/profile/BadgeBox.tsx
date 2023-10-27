import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { BASE_URL_USERS, DEFAULT_PARAMS_USERS } from "@/app/constants/api";
import gold_medal from "../../assets/gold.png";
import silver_medal from "../../assets/silver.png";
import bronze_medal from "../../assets/bronze.png";
import { BsDot } from "react-icons/bs";
import Image from "next/image";
import styles from "./Badges.module.css";
import { BadgeBoxProps, BadgeData, BadgeType, Medal } from "@/app/types";

export const BadgeBox = (props: BadgeBoxProps) => {
  const { type } = props;

  const router = useRouter();
  const { userId } = router.query;

  const [badges, setBadges] = useState<BadgeData[]>([]);
  const medalImages: Medal[] = [
    { type: BadgeType.Gold, image: gold_medal },
    { type: BadgeType.Silver, image: silver_medal },
    { type: BadgeType.Bronze, image: bronze_medal },
  ];

  const medalImage = medalImages.find((medal) => medal.type === type);

  useEffect(() => {
    fetch(`${BASE_URL_USERS}/${userId}/badges?${DEFAULT_PARAMS_USERS}`)
      .then((res) => res.json())
      .then((data) => {
        setBadges(data.items);
      })
      .catch((error) => console.error(error));
  }, [userId]);

  const getBadgeName = (type: BadgeType) => {
    switch (type) {
      case BadgeType.Gold:
        return "gold";
      case BadgeType.Silver:
        return "silver";
      default:
        return "bronze";
    }
  };

  const getBadgeColor = (type: BadgeType) => {
    switch (type) {
      case BadgeType.Gold:
        return "#FFD700";
      case BadgeType.Silver:
        return "#C0C0C0";
      default:
        return "#CD7F32";
    }
  };

  const relevantBadges = useMemo(() => badges?.filter((badge) => badge.rank === getBadgeName(type)) ?? [], [badges, type]);
  const relevantBadgeCount = useMemo(() => relevantBadges?.reduce((total, currentValue) => total + currentValue.award_count, 0), [relevantBadges]);

  const topBadges = relevantBadges.slice(0, 3);

  return (
    <div className={styles.contentBox}>
      <div className={styles.badgeDescription}>
        <Image src={medalImage != null ? medalImage.image : bronze_medal} alt={`${getBadgeName(type)} badge`} className={styles.icon} />
        <div className={styles.badgeCount}>
          <h4>{relevantBadgeCount}</h4>
          <h5>
            {`${getBadgeName(type)}`} badge{relevantBadges?.length === 1 ? "" : "s"}
          </h5>
        </div>
      </div>
      <div className={styles.badgeList}>
        {topBadges.map((badge, i) => (
          <div key={i} className={styles.badgeItem}>
            <BsDot className={styles.badgeDot} style={{ color: getBadgeColor(type) }} />
            <h4 className={styles.badgeName}>{badge.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
