"use client";

import { useLanguage } from "@/src/context/LanguageContext";
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from "react-icons/fa";
import { getAriaLabel } from "../../helpers/acessibility";
import Utils from "../../helpers/classes/Utils";
import { dataTestIds } from "../../helpers/dataTestIds";
import { Button } from "../Button";
import { ScrollButtonProps } from "./index.types";

export const ScrollButton = ({
  className,
  direction,
  href,
}: ScrollButtonProps) => {
  const { scrollTo, scrollToTop } = new Utils();
  const { isLanguagePortuguese } = useLanguage();

  return (
    <Button.Root
      ariaLabel={
        direction === "up"
          ? getAriaLabel(isLanguagePortuguese).button.scrollUp
          : getAriaLabel(isLanguagePortuguese).button.scrollDown
      }
      // TODO remover estilização com tailwind
      className={`${className} button__scroll ${
        direction === "up" ? "top-[15%]" : "bottom-[20%]"
      }`}
      testId={
        direction === "up"
          ? dataTestIds.buttons.scrollUp
          : dataTestIds.buttons.scrollDown
      }
      onClick={() => (direction === "up" ? scrollToTop() : scrollTo(href))}
    >
      {direction === "down" ? (
        <FaRegArrowAltCircleDown />
      ) : (
        <FaRegArrowAltCircleUp />
      )}
    </Button.Root>
  );
};
