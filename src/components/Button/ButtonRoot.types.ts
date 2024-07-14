import { ReactNode } from 'react';

export interface ButtonRootProps {
  className?: string,
  children?: ReactNode,
  onClick: () => void,
  testId: string,
}