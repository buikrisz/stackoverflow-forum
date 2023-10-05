import { ChangeEvent, KeyboardEvent, useContext } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import styles from "./SearchBar.module.css";
import { SearchContext } from "../../contexts/search/SearchContext";
import { BASE_URL_SEARCH, DEFAULT_PARAMS_SEARCH } from "../../constants/api";

export const SearchBar = () => {
  const { searchText, setSearchText, setSearchedTerm, setItems } = useContext(SearchContext);

  const onSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value);
  const onEnterClicked = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchTriggered();
    }
  };

  const onSearchTriggered = () => {
    if (searchText != null && searchText.length > 0) {
      const searchParams = `intitle=${searchText}`;
      const additionalParams = "filter=withbody";

      fetch(`${BASE_URL_SEARCH}?${searchParams}&${DEFAULT_PARAMS_SEARCH}&${additionalParams}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(">>>", data);

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
