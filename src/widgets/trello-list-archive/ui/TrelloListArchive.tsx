import React, { FC } from "react";
import { Card, CardContent, CardActions } from "@mui/material";
import { IBoardList } from "@/shared/types/IBoardList";
import { ListTitle } from "@/shared/ui";
import { TrelloListUnArchive } from "@/features/trello-list-un-archive";

interface Props {
  list: IBoardList;
}

const TrelloListArchive: FC<Props> = ({ list }) => {
  return (
    <Card sx={{ display: "flex", justifyContent: "space-between" }}>
      <CardContent>
        <ListTitle>{list.name}</ListTitle>
      </CardContent>
      <CardActions>
        <TrelloListUnArchive list={list} />
      </CardActions>
    </Card>
  );
};

export default TrelloListArchive;
