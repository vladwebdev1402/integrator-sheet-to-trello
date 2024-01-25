import React, { FC, useState } from "react";
import { Accordion, AccordionActions, Button } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import { TrelloListRename } from "@/features/trello-list-rename";
import { TrelloListToArchive } from "@/features/trello-list-to-archive";
import { TrelloCardAdd } from "@/features/trello-card-add";
import { useGetAllCardsByListIdQuery } from "@/entities/trello-board";
import { ListBody, ListSummary } from "@/shared/ui";
import { IBoardList } from "@/shared/types/IBoardList";
import CardsSkeleton from "./CardsSkeleton";

interface Props {
  list: IBoardList;
  expanded: boolean;
}

const TrelloList: FC<Props> = ({ list, expanded }) => {
  const [isEditName, setIsEditName] = useState(false);

  const {
    data: cards,
    isLoading,
    isFetching,
  } = useGetAllCardsByListIdQuery(list.id);

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
      <ListBody>
        {cards && cards.map((card) => <div>{card.name}</div>)}
        {isLoading && <CardsSkeleton />}
        {!isLoading && <TrelloCardAdd list={list} isFetching={isFetching} />}
      </ListBody>
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
