'use client'

import { ReactNode, useState, useEffect } from "react";
import { ScrollButton } from "../../ScrollButton";
import { useCounterStore } from "../../../state/store";

interface ScrollButtonWrapperProps {
  direction: string;
  href: string;
  className?: string;
}

export const ScrollButtonWrapper = ({ direction, href, className }: ScrollButtonWrapperProps): ReactNode => {
  const [mounted, setMounted] = useState(false);
  const { screenWidth } = useCounterStore();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use a default screenWidth during SSR to prevent hydration mismatch
  const safeScreenWidth = mounted ? screenWidth : 1024;
  
  return (
    <ScrollButton
      className={className}
      direction={direction}
      href={href}
      screenWidth={safeScreenWidth}
    />
  );
};
