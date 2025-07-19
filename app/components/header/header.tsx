import { useLanguage } from "@/app/context/LanguageContext";
import ProgressBar from "../progress-bar/progress-bar";
import styles from "./header.module.scss";

const Header = () => {
  const { information, toggleLanguage } = useLanguage();
  return (
    <header className={styles.header}>
      <button
        aria-label={information._translateButtonLabel}
        className={styles["header__button--translate"]}
        onClick={toggleLanguage}
        type="button"
      >
        {information._translateButtonLabel.toUpperCase()}
      </button>
      <ProgressBar />
    </header>
  );
};

export default Header;
