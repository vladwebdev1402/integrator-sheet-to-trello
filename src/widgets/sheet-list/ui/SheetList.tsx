import React, { FC } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardActionArea,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";

import st from "./SheetList.module.scss";
import { useGetSheetByNameQuery } from "@/entities/spreedsheet";
import Skeletons from "./Skeletons";
import SheetCard from "@/entities/sheet-card/ui/SheetCard";
interface Props {
  sheetId: number;
  title: string;
  expanded?: boolean;
}

const SheetList: FC<Props> = ({ sheetId, title, expanded = false }) => {
  const params = useParams<{ id: string }>();

  const { data, isLoading } = useGetSheetByNameQuery({
    spreadsheetId: params?.id ?? "",
    sheetTitle: title,
  });

  return (
    <Accordion defaultExpanded={expanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <CardActionArea
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
          }}
        ></CardActionArea>
        <Typography
          component="div"
          fontWeight={500}
          fontSize={"20px"}
          variant="body1"
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={st.sheet__cards}>
        {isLoading && expanded && <Skeletons />}
        {data &&
          Array.isArray(data.values) &&
          data.values.map((card) => (
            <SheetCard
              card={{
                title: card[0] ? card[0] : "Name card is empty",
                description: card[1] ? card[1] : "",
              }}
            />
          ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default SheetList;
