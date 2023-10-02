import { useContext } from "react";
import styles from "./SearchResultsPage.module.css";
import { SearchContext } from "../contexts/SearchContext";

export const SearchResultsPage = () => {
  const { searchedTerm } = useContext(SearchContext);
  const searchTriggered = searchedTerm != null && searchedTerm.length > 0;

  return searchTriggered ? (
    <div className={styles.searchResultsPage}>
      <h2 className={styles.title}>Search Results</h2>
      <h5 className={styles.subtitle}>Results for {searchedTerm}</h5>
      <h3 className={styles.count}>***** results</h3>
      <div className={styles.cardList}>
        <div>Card1</div>
        <div>Card2</div>
        <div>Card3</div>
        <div>Card4</div>
      </div>
    </div>
  ) : (
    <div className={styles.searchResultsPage}>
      <h2 className={styles.title}>Ready to explore? Enter your search...</h2>
    </div>
  );
};
