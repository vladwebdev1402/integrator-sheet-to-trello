import React, { FC } from "react";

import { Card, CardActionArea, Skeleton, Typography } from "@mui/material";

import {
  useGetBoardByIdQuery,
  useGetBoardsMembersByIdQuery,
} from "../service/TrelloService";

import {
  BoardContent,
  BoardDescription,
  BoardFade,
  BoardMedia,
  BoardName,
} from "./styled";

interface Props {
  id: string;
}

const BoardCard: FC<Props> = ({ id }) => {
  const boardClick = () => {};

  const { data: board, isLoading } = useGetBoardByIdQuery(id);
  const { data: members } = useGetBoardsMembersByIdQuery(id);

  if (isLoading)
    return <Skeleton variant="rectangular" sx={{ minHeight: "150px" }} />;

  if (board)
    return (
      <Card sx={{ backgroundColor: "transparent", minHeight: "150px" }}>
        <CardActionArea sx={{ height: "100%" }} onClick={boardClick}>
          <BoardMedia
            image={board.prefs.backgroundImage || ""}
            sx={{
              backgroundColor: board.prefs.backgroundImage
                ? "transparent"
                : board.prefs.backgroundColor,
            }}
            component={"img"}
          />
          <BoardFade></BoardFade>
          <BoardContent>
            <BoardName variant="h5" fontWeight={"500"} noWrap component="div">
              {board.name}
            </BoardName>
            <BoardDescription variant="subtitle2" component="div">
              {board.desc}
            </BoardDescription>
            <Typography color="white" variant="subtitle1" marginTop="8px">
              Members: {members?.length ?? 0}
            </Typography>
          </BoardContent>
        </CardActionArea>
      </Card>
    );
};

export default BoardCard;
