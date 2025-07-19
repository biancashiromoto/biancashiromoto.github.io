import { ReactNode } from "react"

export interface LinkRootProps {
  label?: string;
  ariaLabel: string;
  children?: ReactNode
  className?: string;
  link: string;
  target?: string;
  testid: string;
  text?: string;
}