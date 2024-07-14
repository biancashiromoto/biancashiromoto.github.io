import { ButtonRootProps } from "./ButtonRoot.types"

export const ButtonRoot = ({ children, onClick, testId, className }: ButtonRootProps) => {
  return (
    <button
      className={className}
      data-testid={testId}
      onClick={onClick}
      type="button"
    >
      { children }
    </button>
  )
}