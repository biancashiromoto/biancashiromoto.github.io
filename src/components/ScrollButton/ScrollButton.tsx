import { ScrollButtonProps } from './ScrollButton.types'
import { ariaLabel } from '../../helpers/ariaLabel';
import { dataTestIds } from '../../helpers/dataTestIds';
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from 'react-icons/fa';
import { Button } from '../Button';
import Utils from '../../helpers/classes/Utils';

export const ScrollButton = ({ direction, screenWidth, href }: ScrollButtonProps) => {
  const { scrollTo } = new Utils();
  if (screenWidth > 768) {
    return null;
  }

  return(
    <Button.Root
      ariaLabel={direction === "up" ? ariaLabel.button.scrollUp : ariaLabel.button.scrollDown}
      className={`absolute text-3xl animate-osccillate ${direction === "up" ? "top-[15%]" : "bottom-[20%]"}`}
      testId={direction === "up" ? dataTestIds.buttons.scrollUp : dataTestIds.buttons.scrollDown}
      onClick={() => scrollTo(href)}
    >
      {direction === "down" ? <FaRegArrowAltCircleDown /> : <FaRegArrowAltCircleUp />}
    </Button.Root>
  );
}