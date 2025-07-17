"use client";

import { useLanguage } from "@/src/context/LanguageContext";
import { memo } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import Carousel from "../../components/Carousel";
import { Link } from "../../components/Link";
import { getAriaLabel } from "../../helpers/acessibility";

export const Projects = memo(() => {
  const { information, isLanguagePortuguese } = useLanguage();

  return (
    <div className="pages__projects">
      <main>
        {/*  TODO criar componente PageTitle */}
        <h1>{information._projects}</h1>
        <Link.Root
          ariaLabel={getAriaLabel(isLanguagePortuguese).pages.return}
          className="return"
          link="/"
          target="_self"
          testid="return"
          text={information._returnToPreviousPageTooltip}
        >
          <FiArrowLeftCircle />
        </Link.Root>
        <Carousel />
      </main>
    </div>
  );
});

Projects.displayName = "Projects";
