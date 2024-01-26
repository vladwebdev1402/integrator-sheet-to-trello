import React, { FC, useMemo } from "react";
import { Button } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import {
  useGetAllListByBoardIdQuery,
  useUpdateListMutation,
} from "@/entities/trello-board";
import { IBoardList } from "@/shared/types";
import { getNewPosition } from "@/shared/lib";

interface Props {
  list: IBoardList;
  idx: number;
}

const TrelloListShift: FC<Props> = ({ list, idx }) => {
  const { currentData: lists } = useGetAllListByBoardIdQuery(list.idBoard);

  const notArchiveLists = useMemo(
    () => lists?.filter((list) => !list.closed) ?? [],
    [lists]
  );

  const listLength = useMemo(
    () => notArchiveLists?.length ?? 0,
    [notArchiveLists]
  );

  const [updateList] = useUpdateListMutation();

  const upClick = () => {
    const newPos = getNewPosition(notArchiveLists, idx, idx - 1);
    updateList({
      ...list,
      pos: newPos,
    });
  };
  const downClick = () => {
    const newPos = getNewPosition(notArchiveLists, idx, idx + 1);
    updateList({
      ...list,
      pos: newPos,
    });
  };

  if (listLength > 1) {
    return (
      <>
        {idx !== listLength - 1 && (
          <Button
            color="inherit"
            startIcon={<ArrowDownwardIcon />}
            onClick={downClick}
          >
            move down
          </Button>
        )}
        {idx !== 0 && (
          <Button
            color="inherit"
            startIcon={<ArrowUpwardIcon />}
            onClick={upClick}
          >
            move up
          </Button>
        )}
      </>
    );
  }

  return <></>;
};

export default TrelloListShift;
