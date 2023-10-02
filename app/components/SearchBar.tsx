import { ChangeEvent, KeyboardEvent, useContext } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import styles from "./SearchBar.module.css";
import { SearchContext } from "../contexts/SearchContext";

export const SearchBar = () => {
  const { searchText, setSearchText, setSearchedTerm, setItems } = useContext(SearchContext);
  const baseUrl = "https://api.stackexchange.com/2.3/search";

  const onSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value);
  const onEnterClicked = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchTriggered();
    }
  };

  const onSearchTriggered = () => {
    if (searchText != null && searchText.length > 0) {
      const searchParams = `intitle=${searchText}`;
      const additionalParams = "&site=stackoverflow&order=desc&sort=activity";

      fetch(`${baseUrl}?${searchParams}${additionalParams}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchedTerm(searchText);
          setItems(data?.items ?? []);
        })
        .catch((error) => console.error(error));
    } else {
      setSearchedTerm(searchText);
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
