import { ReactNode } from "react"

export interface LinkRootProps {
  ariaLabel: string,
  children?: ReactNode
  className?: string,
  href: string,
  testid: string,
}