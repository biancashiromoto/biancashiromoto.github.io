import { ButtonRootProps } from "./ButtonRoot.types"

export const ButtonRoot = ({ ariaLabel, children, onClick, testId, className }: ButtonRootProps) => {
  return (
    <button
      aria-label={ariaLabel}
      className={`button ${className}`}
      data-testid={testId}
      onClick={onClick}
      role="button"
      type="button"
    >
      { children }
    </button>
  )
}