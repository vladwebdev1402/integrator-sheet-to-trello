import React, { FC } from "react";
import { Button } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";

import { IBoardList } from "@/shared/types/IBoardList";
import { useUpdateListMutation } from "@/entities/trello-board";

interface Props {
  list: IBoardList;
}

const TrelloListToArchive: FC<Props> = ({ list }) => {
  const [update] = useUpdateListMutation();

  const archiveClick = () => {
    update({ ...list, closed: true });
  };

  return (
    <Button startIcon={<ArchiveIcon />} onClick={archiveClick} color="warning">
      archive
    </Button>
  );
};

export default TrelloListToArchive;
