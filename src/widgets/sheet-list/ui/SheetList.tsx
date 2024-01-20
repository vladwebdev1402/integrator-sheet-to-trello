import React, { FC, useMemo } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardActionArea,
  Typography,
  Badge,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";

import st from "./SheetList.module.scss";
import { useGetSheetByNameQuery } from "@/entities/spreedsheet";
import Skeletons from "./Skeletons";
import { SheetCard } from "@/entities/sheet-card";
import { SheetCardAdd } from "@/features/sheet-card-add";
import { SheetListDelete } from "@/features/sheet-list-delete";
interface Props {
  sheetId: number;
  title: string;
  visibleDelete: boolean;
  expanded?: boolean;
}

const SheetList: FC<Props> = ({
  sheetId,
  title,
  visibleDelete,
  expanded = false,
}) => {
  const params = useParams<{ id: string }>();
  const mediaSM = useMediaQuery("(max-width: 568px)");

  const { data, isLoading, isFetching } = useGetSheetByNameQuery({
    spreadsheetId: params?.id ?? "",
    sheetTitle: title,
  });

  const countCards = useMemo(() => {
    return data && Array.isArray(data.values) ? data.values.length : 0;
  }, [data]);

  return (
    <Accordion defaultExpanded={expanded}>
      <Badge
        color="info"
        showZero
        anchorOrigin={{
          horizontal: "left",
          vertical: "top",
        }}
        badgeContent={countCards}
        sx={{ width: "100%" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ width: "100%" }}
        >
          <Typography
            fontWeight={500}
            fontSize={mediaSM ? "17px" : "20px"}
            variant="body1"
          >
            {title}
          </Typography>
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
      </Badge>
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
      {!isLoading && visibleDelete && (
        <SheetListDelete
          sheetId={sheetId}
          isUpdating={isFetching}
          countCards={countCards}
        />
      )}
    </Accordion>
  );
};

export default SheetList;
