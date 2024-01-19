import React, { FC, useMemo } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardActionArea,
  Typography,
  Badge,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";

import st from "./SheetList.module.scss";
import { useGetSheetByNameQuery } from "@/entities/spreedsheet";
import Skeletons from "./Skeletons";
import { SheetCard } from "@/entities/sheet-card";
import { SheetCardAdd } from "@/features/sheet-card-add";
interface Props {
  sheetId: number;
  title: string;
  expanded?: boolean;
}

const SheetList: FC<Props> = ({ sheetId, title, expanded = false }) => {
  const params = useParams<{ id: string }>();

  const { data, isLoading, isFetching } = useGetSheetByNameQuery({
    spreadsheetId: params?.id ?? "",
    sheetTitle: title,
  });

  const countCards = useMemo(() => {
    return data && Array.isArray(data.values) ? data.values.length : 0;
  }, [data]);

  return (
    <Accordion defaultExpanded={expanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Badge color="info" showZero badgeContent={countCards}>
          <Typography fontWeight={500} fontSize={"20px"} variant="body1">
            {title}
          </Typography>
        </Badge>
        <CardActionArea
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
          }}
        ></CardActionArea>
      </AccordionSummary>
      <AccordionDetails className={st.sheet__cards}>
        {isLoading && expanded && <Skeletons />}
        {data &&
          countCards > 0 &&
          data.values!.map((card, idx) => (
            <SheetCard
              key={idx}
              card={{
                title: card[0] ? card[0] : "Name card is empty",
                description: card[1] ? card[1] : "",
              }}
            />
          ))}
        {!isLoading && (
          <SheetCardAdd isUpdating={isFetching} sheetTitle={title} />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default SheetList;
