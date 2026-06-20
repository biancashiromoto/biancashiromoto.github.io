import React from "react";
import styles from "./language-switch.module.scss";
import { useLanguage } from "@/app/context/LanguageProvider";

const LanguageSwitch = () => {
  const { information, toggleLanguage, isLanguagePortuguese } = useLanguage();

  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={isLanguagePortuguese}
        onChange={toggleLanguage}
        role="switch"
        aria-label={information._translateButtonLabel}
        tabIndex={0}
      />
      <span className={styles.slider}></span>
      <span className={styles.text}>{information._translateButtonLabel.toUpperCase()}</span>
      <span aria-live="polite" className="sr-only">
        {isLanguagePortuguese ? "Idioma alterado para português" : "Language changed to English"}
      </span>
    </label>
  );
};

export default LanguageSwitch;
