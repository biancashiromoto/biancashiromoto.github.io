import { ReactNode } from "react";
import { ScrollButton } from "../../ScrollButton";
import { useCounterStore } from "../../../state/store";

interface ScrollButtonWrapperProps {
  direction: string;
  href: string;
  className?: string;
}

export const ScrollButtonWrapper = ({ direction, href, className }: ScrollButtonWrapperProps): ReactNode => {
  const { screenWidth } = useCounterStore();
  
  return (
    <ScrollButton
      className={className}
      direction={direction}
      href={href}
      screenWidth={screenWidth}
    />
  );
};
