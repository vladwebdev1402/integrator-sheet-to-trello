import React, { FC } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardActionArea,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
interface Props {
  sheetId: number;
  title: string;
}

const SheetList: FC<Props> = ({ sheetId, title }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <CardActionArea
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            padding: "16px 16px",
          }}
        >
          {title}
        </CardActionArea>
      </AccordionSummary>
      <AccordionDetails>Карточки</AccordionDetails>
    </Accordion>
  );
};

export default SheetList;
