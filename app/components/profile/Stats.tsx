import { useEffect, useState } from "react";
import styles from "./Stats.module.css";
import { useRouter } from "next/router";
import { BASE_URL_USERS, DEFAULT_PARAMS_USERS } from "@/app/constants/api";
import { StatsProps } from "@/app/types";

export const Stats = (props: StatsProps) => {
  const router = useRouter();
  const { userId } = router.query;
  const { reputation, badge_counts, accept_rate } = props;

  const [answers, setAnswers] = useState(0);
  const [questions, setQuestions] = useState(0);

  const totalBadgeCount = badge_counts != null ? badge_counts.bronze + badge_counts.silver + badge_counts.gold : 0;

  useEffect(() => {
    fetch(`${BASE_URL_USERS}/${userId}/answers?${DEFAULT_PARAMS_USERS}`)
      .then((res) => res.json())
      .then((data) => {
        setAnswers(data.items?.length);
      })
      .catch((error) => console.error(error));

    fetch(`${BASE_URL_USERS}/${userId}/questions?${DEFAULT_PARAMS_USERS}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.items?.length);
      })
      .catch((error) => console.error(error));
  }, [userId]);

  return (
    <div className={styles.statsSection}>
      <h2 className={styles.title}>Stats</h2>
      <div className={styles.content}>
        <div className={styles.item}>
          <h3>{reputation}</h3>
          <h4>reputation</h4>
        </div>
        <div className={styles.item}>
          <h3>{totalBadgeCount}</h3>
          <h4>badges</h4>
        </div>
        <div className={styles.item}>
          <h3>{answers}</h3>
          <h4>answers</h4>
        </div>
        <div className={styles.item}>
          <h3>{questions}</h3>
          <h4>questions</h4>
        </div>
        <div className={styles.item}>
          <h3>{accept_rate}</h3>
          <h4>accept rate</h4>
        </div>
      </div>
    </div>
  );
};
