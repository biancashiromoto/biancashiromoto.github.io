"use client";

import { useLanguage } from "@/src/context/LanguageContext";
import {
  Tooltip as ReactTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import Link from "next/link";
import { getAriaLabel } from "../../helpers/acessibility";
import { dataTestIds } from "../../helpers/dataTestIds";
import { LinkRootProps } from "./LinkRoot.types";

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
  const { isLanguagePortuguese } = useLanguage();

  return (
    <div data-testid={dataTestIds.tooltip} className={`link__${className}`}>
      <TooltipProvider delayDuration={100}>
        <ReactTooltip>
          <TooltipTrigger asChild>
            <Link
              aria-describedby={`${testid}-tooltip`}
              aria-label={`${ariaLabel}${
                isExternalLink
                  ? `- ${
                      getAriaLabel(isLanguagePortuguese).links.opensInANewTab
                    }`
                  : ""
              }`}
              data-testid={testid}
              target={target || "_blank"}
              href={link}
            >
              {children}
            </Link>
          </TooltipTrigger>
          <TooltipContent role="tooltip">
            <p className="text-xs">{text}</p>
          </TooltipContent>
        </ReactTooltip>
      </TooltipProvider>
    </div>
  );
};
