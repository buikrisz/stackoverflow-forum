import { FC } from "react";
import { MdOutlineDone } from "react-icons/md";
import { SearchCardProps } from "../types/SearchContext.types";
import styles from "./SearchCard.module.css";

export const SearchCard: FC<SearchCardProps> = (props) => {
  const { title, text, votes, answer_count, view_count, tags, ownerName, date, link, is_answered = false } = props;

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
            <h4 className={styles.cardReporter}>{ownerName}</h4>
            <h4 className={styles.date}>{date}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
