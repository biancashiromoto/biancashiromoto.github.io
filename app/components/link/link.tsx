import React from "react";
import Link from "next/link";
import { LinkProps } from "./link.types";

export const CustomLink = ({
  path,
  children,
  target = "_self",
  "aria-label": ariaLabel,
}: LinkProps) => {
  return (
    <Link href={path} aria-label={ariaLabel ?? `Link to ${path}`} target={target}>
      {children}
    </Link>
  );
};
