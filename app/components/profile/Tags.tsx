import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { BASE_URL_USERS, DEFAULT_PARAMS_USERS } from "@/app/constants/api";
import styles from "./Tags.module.css";
import { TagsData } from "@/app/types";

export const Tags = () => {
  const router = useRouter();
  const { userId } = router.query;

  const [tags, setTags] = useState<TagsData[]>([]);

  useEffect(() => {
    fetch(`${BASE_URL_USERS}/${userId}/top-tags?${DEFAULT_PARAMS_USERS}`)
      .then((res) => res.json())
      .then((data) => {
        setTags(data.items);
      })
      .catch((error) => console.error(error));
  }, [userId]);

  const tagsToRender = useMemo(() => {
    const filteredTags = tags?.filter((tag) => !(tag.answer_count === 0 && tag.answer_score === 0));
    return filteredTags?.slice(0, 5);
  }, [tags]);

  return (
    <div className={styles.tagsSection}>
      <h2 className={styles.title}>Top tags</h2>
      <div className={styles.content}>
        {tagsToRender != null &&
          tagsToRender.map((tag, i) => (
            <div key={i} className={styles.tagTable}>
              <h3 className={styles.tagName}>{tag.tag_name}</h3>
              <div className={styles.tagDetails}>
                {tag.answer_score != null && (
                  <div className={styles.tagData}>
                    <h3 className={styles.tagDataNumber}>{tag.answer_score}</h3>
                    <h3 className={styles.tagDataName}>score</h3>
                  </div>
                )}
                {tag.answer_count != null && (
                  <div className={styles.tagData}>
                    <h3 className={styles.tagDataNumber}>{tag.answer_count}</h3>
                    <h3 className={styles.tagDataName}>posts</h3>
                  </div>
                )}
                {tag.question_count != null && tag.question_count !== 0 && tag.answer_count != null && (
                  <div className={styles.tagData}>
                    <h3 className={styles.tagDataNumber}>{Math.round((tag.answer_count / tag.question_count) * 100)}</h3>
                    <h3 className={styles.tagDataName}>posts %</h3>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
