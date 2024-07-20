import { ReactNode } from 'react';

export interface ButtonRootProps {
  ariaLabel?: string;
  className?: string,
  children?: ReactNode,
  onClick: () => void,
  testId: string,
}