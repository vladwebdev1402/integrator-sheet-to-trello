import { AccordionDetails, AccordionDetailsProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ListBody = styled(AccordionDetails)<AccordionDetailsProps>(
  (theme) => ({
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    [theme.theme.breakpoints.down(768)]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.theme.breakpoints.down(568)]: {
      gridTemplateColumns: "1fr",
    },
  })
);
