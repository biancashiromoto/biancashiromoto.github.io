import { ScrollButtonProps } from './index.types'
import { getAriaLabel } from '../../helpers/acessibility';
import { dataTestIds } from '../../helpers/dataTestIds';
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from 'react-icons/fa';
import { Button } from '../Button';
import Utils from '../../helpers/classes/Utils';
import { useCounterStore } from '../../state/store';

export const ScrollButton = ({ className, direction, href }: ScrollButtonProps) => {
  const { scrollTo, scrollToTop } = new Utils();
  const { isLanguagePortuguese } = useCounterStore();

  return(
    <Button.Root
      ariaLabel={direction === "up" ? getAriaLabel(isLanguagePortuguese).button.scrollUp : getAriaLabel(isLanguagePortuguese).button.scrollDown}
      // TODO remover estilização com tailwind
      className={`${className} button__scroll ${direction === "up" ? "top-[15%]" : "bottom-[20%]"}`}
      testId={direction === "up" ? dataTestIds.buttons.scrollUp : dataTestIds.buttons.scrollDown}
      onClick={() => direction === "up" ? scrollToTop() : scrollTo(href)}
    >
      {direction === "down" ? <FaRegArrowAltCircleDown /> : <FaRegArrowAltCircleUp />}
    </Button.Root>
  );
}