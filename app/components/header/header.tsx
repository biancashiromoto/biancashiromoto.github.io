import { useLanguage } from "@/src/context/LanguageContext";
import ProgressBar from "../progress-bar/progress-bar";

const Header = () => {
  const { information, toggleLanguage } = useLanguage();
  return (
    <header>
      <button
        aria-label={information._translateButtonLabel}
        className="header__button--translate"
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
