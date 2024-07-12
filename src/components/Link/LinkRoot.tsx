import { LinkRootProps } from "./LinkRoot.types"

export const LinkRoot = ({ ariaLabel, children, className, href, testid }: LinkRootProps) => {
  return (
    <a
      aria-label={ariaLabel}
      className={`${className} hover:scale-150 transition-all`}
      data-testid={testid}
      href={href}
      rel="noopener"
      target="_blank"
    >
      { children }
    </a>
  )
}