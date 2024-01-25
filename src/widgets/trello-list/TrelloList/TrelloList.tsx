import React, { FC, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionActions,
  Button,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import { IBoardList } from "@/shared/types/IBoardList";
import ListSummary from "@/shared/ui/ListSummary/ListSummary";
import { TrelloListRename } from "@/features/trello-list-rename";
import { TrelloListToArchive } from "@/features/trello-list-to-archive";

interface Props {
  list: IBoardList;
  expanded: boolean;
}

const TrelloList: FC<Props> = ({ list, expanded }) => {
  const [isEditName, setIsEditName] = useState(false);

  const renameClick = () => {
    setIsEditName(true);
  };

  return (
    <Accordion defaultExpanded={expanded}>
      <ListSummary title={list.name} badgeContent={0} isEdit={isEditName}>
        <TrelloListRename
          isEdit={isEditName}
          list={list}
          setIsEdit={setIsEditName}
        />
      </ListSummary>
      <AccordionActions>
        <TrelloListToArchive list={list} />
        <Button
          startIcon={<EditIcon />}
          onClick={renameClick}
          variant="outlined"
        >
          rename
        </Button>
      </AccordionActions>
    </Accordion>
  );
};

export default TrelloList;
