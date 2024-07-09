import { ReactNode } from "react"

interface LinkRootProps {
  ariaLabel: string,
  children?: ReactNode
  href: string,
  testid: string,
}

export const LinkRoot = ({ ariaLabel, children, href, testid }: LinkRootProps) => {
  return (
    <a
      aria-label={ariaLabel}
      data-testid={testid}
      href={href}
      rel="noopener"
      target="_blank"
    >
      { children }
    </a>
  )
}