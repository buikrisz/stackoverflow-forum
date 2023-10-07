import { useEffect } from "react";
import { useRouter } from "next/router";
import { BASE_URL_USERS, DEFAULT_PARAMS_USERS } from "@/app/constants/api";
import styles from "@/app/styles/profile.module.css";
import "../../app/styles/globals.css";
import Image from "next/image";
import { Answers, Badges, Communities, Stats, Tags } from "@/app/components/profile";

const UserProfile = () => {
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    /* fetch(`${BASE_URL_USERS}/${userId}?${DEFAULT_PARAMS_USERS}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(">>>", data);
      })
      .catch((error) => console.error(error)); */
  }, [userId]);

  return (
    <section className={styles.profilePage}>
      <div className={styles.profileDescription}>
        <Image alt="ProfilePic" src={""} className={styles.profileImage} />
        <div className={styles.profileName}>
          <h1>John Doe</h1>
          <p>User ID: {userId}</p>
          <h4>Member since ..........</h4>
        </div>
      </div>
      <div className={styles.profileContent}>
        <div className={styles.profileLeftContent}>
          <Stats />
          <Communities />
        </div>
        <div className={styles.profileRightContent}>
          <Badges />
          <Tags />
          <Answers />
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
