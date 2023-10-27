import { useEffect, useMemo, useState } from "react";
import styles from "./Communities.module.css";
import { useRouter } from "next/router";
import { BASE_URL_USERS } from "@/app/constants/api";
import Link from "next/link";
import { Community } from "@/app/types";

export const Communities = () => {
  const router = useRouter();
  const { userId } = router.query;

  const [communities, setCommunities] = useState<Community[]>([]);
  const sortedCommunities = useMemo(() => communities?.sort((a, b) => b.reputation - a.reputation), [communities]);

  useEffect(() => {
    fetch(`${BASE_URL_USERS}/${userId}/associated`)
      .then((res) => res.json())
      .then((data) => {
        setCommunities(data.items);
      })
      .catch((error) => console.error(error));
  }, [userId]);

  return (
    <div className={styles.communitiesSection}>
      <h2 className={styles.title}>Communities</h2>
      <div className={styles.content}>
        {sortedCommunities?.map((community) => (
          <div key={community.account_id} className={styles.item}>
            <Link href={community.site_url} className={styles.link}>
              {community.site_name}
            </Link>
            <h4>{community.reputation}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
