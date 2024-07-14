import React from 'react'
import { ScrollButtonProps } from './ScrollButton.types'
import { ariaLabel } from '../../helpers/ariaLabel';
import { dataTestIds } from '../../helpers/dataTestIds';
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from 'react-icons/fa';
import { Link } from '../Link';

export const ScrollButton = ({ direction, screenWidth }: ScrollButtonProps) => {
  if (screenWidth > 768) {
    return;
  }
  if (direction === "down") {
    return(
      <Link.Root
        ariaLabel={ariaLabel.links.pageDown}
        href="#about-me__container"
        className="absolute bottom-48 text-3xl"
        target="_self"
        testid={dataTestIds.links.pageDown}
      >
        <FaRegArrowAltCircleDown />
      </Link.Root>
    );
  }
  return(
    <Link.Root
      ariaLabel={ariaLabel.links.pageUp}
      href="#home-start"
      className="absolute text-3xl top-36"
      target="_self"
      testid={dataTestIds.links.pageUp}
    >
      <FaRegArrowAltCircleUp />
    </Link.Root>
  );
}