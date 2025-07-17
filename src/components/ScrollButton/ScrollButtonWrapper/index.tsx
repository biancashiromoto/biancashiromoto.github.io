"use client";

import { ReactNode, useState, useEffect } from "react";
import { ScrollButton } from "../../ScrollButton";
import { useWindowResize } from "@/src/context/WindowResizeProvider";

interface ScrollButtonWrapperProps {
  direction: string;
  href: string;
  className?: string;
}

export const ScrollButtonWrapper = ({
  direction,
  href,
  className,
}: ScrollButtonWrapperProps): ReactNode => {
  const [mounted, setMounted] = useState(false);
  const { width } = useWindowResize();

  useEffect(() => {
    setMounted(true);
  }, []);

  const safeWidth = mounted ? width : 1024;

  return (
    <ScrollButton
      className={className}
      direction={direction}
      href={href}
      screenWidth={safeWidth}
    />
  );
};
