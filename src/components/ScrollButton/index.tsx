import { ScrollButtonProps } from './index.types'
import { ariaLabel } from '../../helpers/ariaLabel';
import { dataTestIds } from '../../helpers/dataTestIds';
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from 'react-icons/fa';
import { Button } from '../Button';
import Utils from '../../helpers/classes/Utils';

export const ScrollButton = ({ direction, href }: ScrollButtonProps) => {
  const { scrollTo, scrollToTop } = new Utils();

  return(
    <Button.Root
      ariaLabel={direction === "up" ? ariaLabel.button.scrollUp : ariaLabel.button.scrollDown}
      // TODO remover estilização com tailwind
      className={`scroll ${direction === "up" ? "top-[15%]" : "bottom-[20%]"}`}
      testId={direction === "up" ? dataTestIds.buttons.scrollUp : dataTestIds.buttons.scrollDown}
      onClick={() => direction === "up" ? scrollToTop() : scrollTo(href)}
    >
      {direction === "down" ? <FaRegArrowAltCircleDown /> : <FaRegArrowAltCircleUp />}
    </Button.Root>
  );
}