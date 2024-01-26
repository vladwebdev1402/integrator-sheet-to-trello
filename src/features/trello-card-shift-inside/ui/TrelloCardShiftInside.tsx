import React, { FC, useMemo } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import { IBoardCard } from "@/shared/types";
import {
  useGetAllCardsByBoardIdQuery,
  useUpdateCardMutation,
} from "@/entities/trello-board";
import { getNewPosition } from "@/shared/lib";

interface Props {
  card: IBoardCard;
}

const TrelloCardShiftInside: FC<Props> = ({ card }) => {
  const { currentData } = useGetAllCardsByBoardIdQuery(card.idBoard);
  const [updateCard] = useUpdateCardMutation();

  const cardsInsideList = useMemo(() => {
    return currentData
      ?.filter((arrCard) => arrCard.idList === card.idList)
      .sort((a, b) => a.pos - b.pos);
  }, [currentData, card]);

  const currentIdx = useMemo(() => {
    return cardsInsideList?.findIndex((arrCard) => arrCard.id === card.id) ?? 0;
  }, [cardsInsideList, card]);

  const cardposChange = (e: SelectChangeEvent) => {
    const newIdx = Number(e.target.value);
    const newPos = getNewPosition(cardsInsideList ?? [], currentIdx, newIdx);
    updateCard({
      ...card,
      pos: newPos,
    });
  };

  return (
    <FormControl sx={{ width: "230px" }}>
      <InputLabel>Sheet</InputLabel>
      <Select
        value={`${currentIdx}`}
        label="Sheet"
        onChange={cardposChange}
        maxRows={5}
      >
        {cardsInsideList?.map((arrCard, idx) => (
          <MenuItem value={idx} key={arrCard.id} sx={{ maxWidth: "230px" }}>
            {arrCard.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TrelloCardShiftInside;
