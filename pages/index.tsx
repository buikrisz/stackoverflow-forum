import { SearchBar, SearchResultsPage } from "@/app/components";
import styles from "@/app/styles/index.module.css";
import "../app/styles/globals.css";

const Home = () => {
  return (
    <section className={styles.landingSection}>
      <SearchBar />
      <SearchResultsPage />
    </section>
  );
};

export default Home;
