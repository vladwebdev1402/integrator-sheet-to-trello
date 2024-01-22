import React, { FC, useCallback, useMemo } from "react";
import { IconButton, ButtonGroup, useMediaQuery } from "@mui/material";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";

import { CSheetCard } from "@/shared/types";
import {
  useGetSheetByIdQuery,
  useShiftCardInsideMutation,
} from "@/entities/spreedsheet";
import { useParams } from "react-router";

interface Props {
  card: CSheetCard;
}

const SheetCardShiftInside: FC<Props> = ({ card }) => {
  const mediaSM = useMediaQuery("(max-width: 568px");
  const params = useParams<{ id: string }>();
  const [shiftCard] = useShiftCardInsideMutation();
  const { currentData } = useGetSheetByIdQuery({
    spreadsheetId: params?.id ?? "",
    sheetId: card.sheetId,
  });

  const countCards = useMemo(() => {
    return currentData?.length ?? 0;
  }, [currentData]);

  const fetchUpdate = useCallback(
    (newIdx: number) => {
      if (currentData) {
        const oldCard = currentData[newIdx];
        const newSheet = currentData.map((arrCard, idx) => {
          if (idx === newIdx) return card.getArray();
          else if (idx === card.idx) return oldCard;
          return arrCard;
        });
        shiftCard({
          spreadsheetId: params?.id ?? "",
          newSheet: newSheet,
          sheetId: card.sheetId,
          newIdx: newIdx,
          oldIdx: card.idx,
        });
      }
    },
    [currentData, params, card, shiftCard]
  );

  const clickShiftNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    fetchUpdate(card.idx + 1);
  };

  const clickShiftPrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    fetchUpdate(card.idx - 1);
  };

  return (
    <ButtonGroup sx={{ zIndex: "10" }}>
      {card.idx !== 0 && (
        <IconButton color="info" onClick={clickShiftPrev}>
          {mediaSM ? (
            <ArrowCircleUpOutlinedIcon fontSize="large" />
          ) : (
            <ArrowCircleLeftOutlinedIcon />
          )}
        </IconButton>
      )}
      {countCards - 1 !== card.idx && (
        <IconButton color="info" onClick={clickShiftNext}>
          {mediaSM ? (
            <ArrowCircleDownOutlinedIcon fontSize="large" />
          ) : (
            <ArrowCircleRightOutlinedIcon />
          )}
        </IconButton>
      )}
    </ButtonGroup>
  );
};

export default SheetCardShiftInside;
