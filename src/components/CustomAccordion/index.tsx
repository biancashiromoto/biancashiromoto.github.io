import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { Link } from "../Link";
import Accordion, { AccordionSlots } from '@mui/material/Accordion';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from "react";
import Fade from '@mui/material/Fade';
import Information from "../../helpers/classes/Information";
import { useCounterStore } from "../../state/store";

interface CustomAccordionProps {
  className: string;
}

export const CustomAccordion = ({className}: CustomAccordionProps) => {
  const { isLanguagePortuguese } = useCounterStore()
  const ptInformation = new Information("pt-br");
  const enInformation = new Information("en");

  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div className={`accordion bg-inherit ${className}`}>
      <Accordion
        onChange={handleExpansion}
        slots={{ transition: Fade as AccordionSlots['transition'] }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={{
          '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
          '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
          backgroundColor: 'inherit',
          color: 'inherit',
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon className="text-white" />}
          aria-controls="panel1-content"
          sx={{
            margin: "0",
            padding: "0",
            height: "10px"
          }}
        >
          <Typography
            sx={{
              fontFamily: "inherit",
              fontSize: "1rem",
            }}
          >
            {isLanguagePortuguese ? ptInformation._downloadCVButtonLabel : enInformation._downloadCVButtonLabel}
          </Typography>
        </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: "0"
            }}
          >
            <Link.Root
              href="https://drive.google.com/file/d/1-6ScI99TIK8ESDYyOjpWxXpue3ZRFptc/view"
              ariaLabel="Currículo"
              testid="link__resume"
              target="_blank"
              className="link__resume"
            >
              <Link.Label label="Português (Brasil)"/>
            </Link.Root>
            <Link.Root
              href="https://drive.google.com/file/d/1t40cObr-pugBxllJ7r83UPK_KJhZm0GX/view?usp=sharing"
              ariaLabel="Resume"
              testid="link__resume"
              target="_blank"
              className="link__resume"
            >
              <Link.Label label="English"/>
            </Link.Root>
          </AccordionDetails>
      </Accordion>
    </div>
  )
}