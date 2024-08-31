import { ariaLabel } from "../../helpers/acessibility";
import { FiArrowLeftCircle } from "react-icons/fi";
import { memo } from "react";
import Carousel from "../../components/Carousel";
import { Link } from "../../components/Link";
import { useCounterStore } from "../../state/store";

export const Projects = memo(() => {
  const {
    isLanguagePortuguese,
    enInformation,
    ptInformation
  } = useCounterStore();

  return (
    <div className="pages__projects">
      <main>
        {/*  TODO criar componente PageTitle */}
        <h1>{isLanguagePortuguese ? ptInformation._projects : enInformation._projects}</h1>
        <Link.Root
          ariaLabel={ariaLabel(isLanguagePortuguese).pages.return}
          className="return"
          link="/"
          target="_self"
          testid="return"
          text={isLanguagePortuguese ? ptInformation._returnToPreviousPageTooltip : enInformation._returnToPreviousPageTooltip}
        >
          <FiArrowLeftCircle />
        </Link.Root>
        <Carousel />
      </main>
    </div>
  );
});
