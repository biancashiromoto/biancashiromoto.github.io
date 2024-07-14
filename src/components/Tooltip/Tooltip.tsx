import { TooltipProvider, Tooltip as ReactTooltip, TooltipTrigger, TooltipContent,  } from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'
import { dataTestIds } from '../../helpers/dataTestIds';

interface TooltipProps {
  children?: ReactNode;
  className?: string;
  text: string;
}

export const Tooltip = ({ children, className, text }: TooltipProps) => {
  return (
    <div data-testid={dataTestIds.tooltip} className={className}>
      <TooltipProvider delayDuration={100}>
          <ReactTooltip>
            <TooltipTrigger>
              { children }
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">{ text }</p>
            </TooltipContent>
          </ReactTooltip>
        </TooltipProvider>
    </div>
  )
}