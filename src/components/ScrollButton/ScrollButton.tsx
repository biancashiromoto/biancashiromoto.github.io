import { ScrollButtonProps } from './ScrollButton.types'
import { ariaLabel } from '../../helpers/ariaLabel';
import { dataTestIds } from '../../helpers/dataTestIds';
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from 'react-icons/fa';
import { Link } from '../Link';

export const ScrollButton = ({ direction, screenWidth, href }: ScrollButtonProps) => {
  if (screenWidth > 768) {
    return;
  }

  return(
    <Link.Root
      ariaLabel={direction === "down" ? ariaLabel.links.pageDown : ariaLabel.links.pageUp}
      href={href}
      className={`absolute text-3xl ${direction}-[15%] animate-osccillate ${direction === "up" ? "top-[15%]" : "bottom-[15%]"}`}
      target="_self"
      testid={direction === "down" ? dataTestIds.links.pageDown : dataTestIds.links.pageUp}
    >
      {direction === "down" ? <FaRegArrowAltCircleDown /> : <FaRegArrowAltCircleUp />}
    </Link.Root>
  );
}