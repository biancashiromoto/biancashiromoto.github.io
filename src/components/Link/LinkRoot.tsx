import { Link as ReactLink } from "react-router-dom";
import { LinkRootProps } from "./LinkRoot.types"
import { TooltipProvider, Tooltip as ReactTooltip, TooltipTrigger, TooltipContent,  } from '@radix-ui/react-tooltip';
import { dataTestIds } from "../../helpers/dataTestIds";
import { getAriaLabel } from "../../helpers/acessibility";
import { useCounterStore } from "../../state/store";

export const LinkRoot = ({
  ariaLabel,
  children,
  className,
  target,
  testid,
  link,
  text, 
}: LinkRootProps) => {
  const isExternalLink = target === undefined;
  const { isLanguagePortuguese } = useCounterStore();

  return (
    <div data-testid={dataTestIds.tooltip} className={`link__${className}`} >
      <TooltipProvider delayDuration={100}>
          <ReactTooltip>
            <TooltipTrigger asChild>
              <ReactLink
                aria-describedby={`${testid}-tooltip`}
                aria-label={`${ariaLabel} ${isExternalLink && `- ${getAriaLabel(isLanguagePortuguese).links.opensInANewTab}` }`}
                data-testid={testid}
                target={target || "_blank"}
                to={link}
              >
                { children }
              </ReactLink>
            </TooltipTrigger>
            <TooltipContent role="tooltip">
              <p className="text-xs">{ text }</p>
            </TooltipContent>
          </ReactTooltip>
        </TooltipProvider>
    </div>
  )
}