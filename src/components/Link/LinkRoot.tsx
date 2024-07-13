import { LinkRootProps } from "./LinkRoot.types"

export const LinkRoot = ({ ariaLabel, children, className, href, target, testid }: LinkRootProps) => {
  return (
    <a
      aria-label={ariaLabel}
      className={`${className} transition-all`}
      data-testid={testid}
      href={href}
      rel="noopener"
      target={target || "_blank"}
    >
      { children }
    </a>
  )
}