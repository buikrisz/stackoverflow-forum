import { ChangeEvent, useState, KeyboardEvent } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import styles from "./SearchBar.module.css";

export const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const onSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value);
  const onEnterClicked = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchTriggered();
    }
  };

  const onSearchTriggered = () => {
    if (searchText != null && searchText.length > 0) {
      console.log(searchText);
    }
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBox}>
        <button className={styles.searchIcon} onClick={onSearchTriggered}>
          <BiSearchAlt2 />
        </button>
        <input className={styles.searchInput} name="searchBox" value={searchText} onChange={onSearchTextChange} onKeyDown={onEnterClicked} />
      </div>
    </div>
  );
};
