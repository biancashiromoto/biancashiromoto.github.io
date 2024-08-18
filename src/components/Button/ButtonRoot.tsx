import { ButtonRootProps } from "./ButtonRoot.types"

export const ButtonRoot = ({ ariaLabel, children, onClick, testId, className }: ButtonRootProps) => {
  return (
    <button
      aria-label={ariaLabel}
      className={`button__${className}`}
      data-testid={testId}
      onClick={onClick}
      type="button"
    >
      { children }
    </button>
  )
}