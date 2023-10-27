import { useCallback, useMemo } from "react";
import { MdOutlineDone } from "react-icons/md";
import { SearchCardProps } from "@/app/types";
import styles from "./SearchCard.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

export const SearchCard = (props: SearchCardProps) => {
  const { title, text, votes, answer_count, view_count, tags, owner, date, link, is_answered = false, creation_date } = props;

  const router = useRouter();

  const formatViewCount = (view_count: number) => {
    if (view_count >= 1000) {
      const truncated = (view_count / 1000).toFixed(1);
      return `${truncated}k`;
    } else {
      return view_count.toString();
    }
  };

  const getColorForViewCount = (view_count: number) => {
    const maxCount = 1000;
    const minColor = [138, 141, 142];
    const maxColor = [161, 148, 122];

    const color = minColor.map((min, i) => {
      const max = maxColor[i];
      const range = max - min;
      return Math.min(Math.max(min + range * (view_count / maxCount), 0), 255);
    });

    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  };

  const formattedViewCount = formatViewCount(view_count);
  const viewColor = {
    color: getColorForViewCount(view_count),
  };

  const onProfileClick = useCallback(() => {
    if (owner?.user_id != null) {
      router.push(`/profile/${owner.user_id}`);
    }
  }, [owner?.user_id, router]);

  const convertedDate = useMemo(() => {
    if (creation_date == null) return undefined;

    const timestamp = creation_date.valueOf() * 1000;
    const convertedDate = new Date(timestamp);

    return convertedDate.toLocaleString();
  }, [creation_date]);

  return (
    <div className={styles.searchCard}>
      <div className={styles.cardInfos}>
        {votes != null && (
          <h3 className={styles.cardVotes}>
            {votes} vote{`${votes === 1 ? "" : "s"}`}
          </h3>
        )}
        <h3 className={is_answered ? styles.cardAnswered : styles.cardUnanswered}>
          {is_answered && <MdOutlineDone className={styles.cardAnsweredIcon} />}
          {answer_count} answer{`${answer_count === 1 ? "" : "s"}`}
        </h3>
        <h3 className={styles.cardViews} style={viewColor}>
          {formattedViewCount} view{`${view_count === 1 ? "" : "s"}`}
        </h3>
      </div>
      <div className={styles.cardContent}>
        <a className={styles.cardTitle} href={link}>
          {title}
        </a>
        <div className={styles.cardText} dangerouslySetInnerHTML={{ __html: text }} />
        <div className={styles.cardBottom}>
          {tags != null && tags.length > 0 && (
            <div className={styles.cardTags}>
              {tags.map((tag, i) => (
                <h4 key={i} className={styles.cardTag}>
                  {tag}
                </h4>
              ))}
            </div>
          )}
          <div className={styles.cardDetails}>
            {owner != null && (
              <>
                <button className={styles.cardReporter} onClick={onProfileClick}>
                  {owner.profile_image != null && (
                    <Image
                      loader={() => owner.profile_image}
                      src={owner.profile_image}
                      alt="profile image"
                      className={styles.cardProfilePic}
                      width={20}
                      height={20}
                    />
                  )}
                  {owner.display_name ?? ""}
                </button>
                {creation_date != null && <h3>{`asked ${convertedDate}`}</h3>}
              </>
            )}
            <h4 className={styles.date}>{date}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
