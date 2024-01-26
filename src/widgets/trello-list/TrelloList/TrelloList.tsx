import React, { FC, useState, useMemo } from "react";
import { Accordion, AccordionActions, Button } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import { TrelloListRename } from "@/features/trello-list-rename";
import { TrelloListToArchive } from "@/features/trello-list-to-archive";
import { TrelloCardAdd } from "@/features/trello-card-add";
import { useGetAllCardsByBoardIdQuery } from "@/entities/trello-board";
import { ListBody, ListSummary } from "@/shared/ui";
import { IBoardList } from "@/shared/types/IBoardList";
import CardsSkeleton from "./CardsSkeleton";
import { BoardCard } from "@/entities/board-card";
import { useParams } from "react-router-dom";

interface Props {
  list: IBoardList;
  expanded: boolean;
}

const TrelloList: FC<Props> = ({ list, expanded }) => {
  const [isEditName, setIsEditName] = useState(false);
  const params = useParams<{ id: string }>();

  const { data: cards, isLoading } = useGetAllCardsByBoardIdQuery(
    params?.id ?? "no-id"
  );

  const cardsByList = useMemo(() => {
    return (
      cards
        ?.filter((card) => card.idList === list.id)
        .sort((a, b) => a.pos - b.pos) ?? []
    );
  }, [list, cards]);

  const renameClick = () => {
    setIsEditName(true);
  };

  return (
    <Accordion defaultExpanded={expanded}>
      <ListSummary
        title={list.name}
        badgeContent={cardsByList?.length ?? 0}
        isEdit={isEditName}
      >
        <TrelloListRename
          isEdit={isEditName}
          list={list}
          setIsEdit={setIsEditName}
        />
      </ListSummary>
      <ListBody>
        {cards &&
          cardsByList.map((card) => <BoardCard card={card} key={card.id} />)}
        {isLoading && <CardsSkeleton />}
        {!isLoading && <TrelloCardAdd list={list} />}
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
