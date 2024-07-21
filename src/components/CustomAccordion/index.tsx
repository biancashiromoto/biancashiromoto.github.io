import { AccordionDetails, AccordionSummary, createTheme, Typography } from "@mui/material";
import { Link } from "../Link";
import Accordion, { AccordionSlots } from '@mui/material/Accordion';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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

  const theme = createTheme();

  return (
    <div className={`accordion bg-inherit mb-10 ${className}`}>
      <Accordion
        slots={{ transition: Fade as AccordionSlots['transition'] }}
        slotProps={{ transition: { timeout: 400 }}}
        sx={{
          color: 'inherit',
          backgroundColor: "inherit",
          height: theme.spacing(5)
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon className="text-white" />}
          aria-controls="panel1-content"
          sx={{
            margin: theme.spacing(0, "auto")
          }}
        >
          <Typography
            sx={{
              fontFamily: "inherit",
              fontSize: ".875rem",  
              lineHeight: theme.spacing(0),
              minHeight: theme.spacing(0)
            }}
          >
            {isLanguagePortuguese ? ptInformation._downloadCVButtonLabel : enInformation._downloadCVButtonLabel}
          </Typography>
        </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(1),
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
              className="link__resume pt-3"
            >
              <Link.Label label="English"/>
            </Link.Root>
          </AccordionDetails>
      </Accordion>
    </div>
  )
}