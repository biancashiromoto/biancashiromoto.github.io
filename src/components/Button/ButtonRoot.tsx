import { ReactNode } from 'react';

interface ButtonRootProps {
  className?: string,
  children?: ReactNode,
  onClick: () => void,
  testId: string,
}

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