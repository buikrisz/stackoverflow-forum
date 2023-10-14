import { useContext } from "react";
import styles from "./SearchResultsPage.module.css";
import { SearchContext } from "../../contexts/search/SearchContext";
import { SearchCard } from "./SearchCard";

export const SearchResultsPage = () => {
  const { searchedTerm, items = [] } = useContext(SearchContext);
  const searchTriggered = searchedTerm != null && searchedTerm.length > 0;

  return searchTriggered ? (
    <div className={styles.searchResultsPage}>
      <h2 className={styles.title}>Search Results</h2>
      <h5 className={styles.subtitle}>Results for {searchedTerm}</h5>
      <h3 className={styles.count}>
        {items.length} result{`${items.length !== 1 ? "s" : ""}`}
      </h3>
      <div className={styles.cardList}>
        {items.map((item) => (
          <SearchCard
            key={item.question_id}
            title={item.title}
            text={item.body}
            answer_count={item.answer_count}
            view_count={item.view_count}
            owner={item.owner}
            tags={item.tags}
            link={item.link}
            is_answered={item.is_answered}
            creation_date={item.creation_date}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className={styles.searchResultsPage}>
      <h2 className={styles.title}>Ready to explore? Enter your search...</h2>
    </div>
  );
};
