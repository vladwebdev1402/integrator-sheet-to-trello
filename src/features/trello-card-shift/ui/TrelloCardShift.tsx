import { FC, useMemo } from "react";

import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import { IBoardCard } from "@/shared/types";
import {
  useGetAllCardsByBoardIdQuery,
  useGetAllListByBoardIdQuery,
  useUpdateCardMutation,
} from "@/entities/trello-board";
import { getNewPosition } from "@/shared/lib";

interface Props {
  card: IBoardCard;
}

const TrelloCardShift: FC<Props> = ({ card }) => {
  const { currentData } = useGetAllListByBoardIdQuery(card.idBoard);
  const { currentData: cards } = useGetAllCardsByBoardIdQuery(card.idBoard);
  const [updateCard] = useUpdateCardMutation();

  const notArchiveLists = useMemo(() => {
    return currentData?.filter((list) => list.closed === false);
  }, [currentData]);

  const currentList = useMemo(() => {
    return notArchiveLists
      ? notArchiveLists.filter((list) => list.id === card.idList)[0].id
      : "";
  }, [card, notArchiveLists]);

  const sheetChange = (e: SelectChangeEvent) => {
    const newList = e.target.value;
    if (newList !== card.idList) {
      const cardsInNewList =
        cards?.filter((card) => card.idList === newList) ?? [];
      const newPos = getNewPosition(
        cardsInNewList,
        0,
        cardsInNewList.length - 1
      );
      updateCard({ ...card, idList: newList, pos: newPos });
    }
  };

  return (
    <FormControl sx={{ width: "230px" }}>
      <InputLabel>Column</InputLabel>
      <Select
        value={currentList}
        label="Column"
        onChange={sheetChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: "225px",
            },
          },
        }}
      >
        {notArchiveLists?.map((list) => (
          <MenuItem value={list.id} key={list.id}>
            {list.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TrelloCardShift;
