import React, { FC } from "react";
import { IconButton } from "@mui/material";
import UnarchiveIcon from "@mui/icons-material/Unarchive";

import { IBoardList } from "@/shared/types/IBoardList";
import { useUpdateListMutation } from "@/entities/trello-board";

interface Props {
  list: IBoardList;
}

const TrelloListUnArchive: FC<Props> = ({ list }) => {
  const [updateList] = useUpdateListMutation();

  const unarchiveClick = () => {
    updateList({ ...list, closed: false });
  };

  return (
    <IconButton color="warning" onClick={unarchiveClick}>
      <UnarchiveIcon />
    </IconButton>
  );
};

export default TrelloListUnArchive;
