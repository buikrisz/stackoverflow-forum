import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { BASE_URL_USERS, DEFAULT_PARAMS_USERS } from "@/app/constants/api";
import { Answers, Badges, Communities, Stats, Tags } from "@/app/components/profile";
import { FaBirthdayCake } from "react-icons/fa";
import styles from "@/app/styles/profile.module.css";
import "../../app/styles/globals.css";
import Image from "next/image";

export type AccountAgeProps = { years?: number; months?: number };
export type UserData = {
  display_name?: string;
  creation_date?: Date;
  profile_image?: string;
};

const UserProfile = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [userData, setUserData] = useState<UserData>({});

  useEffect(() => {
    fetch(`${BASE_URL_USERS}/${userId}?${DEFAULT_PARAMS_USERS}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(">>> userData", data);
        setUserData(data.items[0]);
      })
      .catch((error) => console.error(error));
  }, [userId]);

  const calculatedAccountAge = useMemo((): AccountAgeProps => {
    if (userData?.creation_date == null) return {};

    const startDate = new Date(userData.creation_date.valueOf() * 1000);
    const currentDate = new Date();

    const timeDifference = currentDate.valueOf() - startDate.valueOf();
    const years = Math.floor(timeDifference / (365 * 24 * 60 * 60 * 1000));
    const months = Math.floor((timeDifference % (365 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000));

    return { years, months };
  }, [userData?.creation_date]);

  const pluralizeText = useCallback((text: string, n?: number) => {
    if (n == null) return "";
    if (n === 1) return `${n} ${text}`;

    return `${n} ${text}s`;
  }, []);

  return (
    <section className={styles.profilePage}>
      <div className={styles.profileDescription}>
        <Image
          alt="ProfilePic"
          loader={() => userData?.profile_image ?? ""}
          src={userData?.profile_image ?? ""}
          className={styles.profileImage}
          width={10}
          height={10}
        />
        <div className={styles.profileData}>
          <h1 className={styles.profileName}>{userData?.display_name ?? ""}</h1>
          <div className={styles.profileMetadata}>
            {userData?.creation_date != null && (
              <div className={styles.accountBirthday}>
                <FaBirthdayCake className={styles.accountBirthdayIcon} />
                <h4>
                  Member for {pluralizeText("year", calculatedAccountAge.years)}, {pluralizeText("month", calculatedAccountAge.months)}
                </h4>
              </div>
            )}
          </div>
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
