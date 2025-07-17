"use client";

import { useLanguage } from "@/src/context/LanguageContext";
import { dataTestIds } from "../../helpers/dataTestIds";
import { Button } from "../Button";

export const Header = () => {
  const { toggleLanguage, information } = useLanguage();

  return (
    <header data-testid="header">
      <Button.Root
        aria-label={information._translateButtonLabel}
        className="header__button--translate"
        onClick={() => toggleLanguage()}
        testId={dataTestIds.buttons.toggleLanguageButton}
      >
        {information._translateButtonLabel.toUpperCase()}
      </Button.Root>
    </header>
  );
};
