import React, { FC, useState, useMemo, useEffect } from "react";

import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import { IBoardCard } from "@/shared/types";
import {
  useGetAllListByBoardIdQuery,
  useUpdateCardMutation,
} from "@/entities/trello-board";

interface Props {
  card: IBoardCard;
}

const TrelloCardShift: FC<Props> = ({ card }) => {
  const { currentData } = useGetAllListByBoardIdQuery(card.idBoard);
  const [updateCard] = useUpdateCardMutation();

  const notArchiveLists = useMemo(() => {
    return currentData?.filter((list) => list.closed === false);
  }, [currentData]);

  const currentList = useMemo(() => {
    return notArchiveLists
      ? notArchiveLists.filter((list) => list.id === card.idList)[0].id
      : "";
  }, [card, notArchiveLists]);

  const [currentValue, setCurrentValue] = useState(currentList);

  const sheetChange = (e: SelectChangeEvent) => {
    setCurrentValue(e.target.value);
  };

  useEffect(() => {
    if (currentValue !== card.idList) {
      updateCard({ ...card, idList: currentValue });
    }
  }, [currentValue, card, updateCard]);

  return (
    <FormControl sx={{ width: "230px" }}>
      <InputLabel>Sheet</InputLabel>
      <Select
        value={currentValue}
        label="Sheet"
        onChange={sheetChange}
        maxRows={5}
      >
        {notArchiveLists?.map((list) => (
          <MenuItem value={list.id}>{list.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TrelloCardShift;
