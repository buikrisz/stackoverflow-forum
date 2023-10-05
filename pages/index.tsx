import { SearchBar, SearchResultsPage } from "@/app/components/search";
import { SearchContextProvider } from "@/app/contexts/search/SearchContextProvider";
import styles from "@/app/styles/index.module.css";
import "../app/styles/globals.css";

const Home = () => {
  return (
    <SearchContextProvider>
      <section className={styles.landingSection}>
        <SearchBar />
        <SearchResultsPage />
      </section>
    </SearchContextProvider>
  );
};

export default Home;
