import { ReactNode } from 'react';

interface ButtonRootProps {
  children?: ReactNode,
  onClick: () => void,
  testId: string,
}

export const ButtonRoot = ({ children, onClick, testId }: ButtonRootProps) => {
  return (
    <button
      data-testid={testId}
      onClick={onClick}
      type="button"
    >
      { children }
    </button>
  )
}