import { ReactNode } from "react"

export interface LinkRootProps {
  ariaLabel: string,
  children?: ReactNode
  className?: string,
  href: string,
  target?: string,
  testid: string,
}

export interface LinkLabelProps {
  className?: string;
  label?: string;
}

