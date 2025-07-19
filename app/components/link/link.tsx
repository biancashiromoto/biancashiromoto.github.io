"use client";

import Link from "next/link";
import { LinkProps } from "./link.types";

export const CustomLink = ({ path, children, target = "_self" }: LinkProps) => {
  return (
    <Link href={path} aria-label={`Link to ${path}`} target={target}>
      {children}
    </Link>
  );
};
