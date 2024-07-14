import { TooltipProvider, Tooltip as ReactTooltip, TooltipTrigger, TooltipContent,  } from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'

interface TooltipProps {
  children?: ReactNode;
  text: string;
}

export const Tooltip = ({ children, text }: TooltipProps) => {
  return (
    <div>
      <TooltipProvider>
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