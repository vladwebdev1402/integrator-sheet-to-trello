import React, { FC } from "react";

import { Card, CardActionArea, Skeleton, Typography } from "@mui/material";

import {
  useGetBoardByIdQuery,
  useGetBoardsMembersByIdQuery,
} from "../service/TrelloService";

import {
  BoardContent,
  BoardDescription,
  BoardErrorContent,
  BoardFade,
  BoardMedia,
  BoardName,
} from "./styled";
import { useNavigate } from "react-router-dom";
import { routerPaths } from "@/shared/constants";

interface Props {
  id: string;
}

const BoardCard: FC<Props> = ({ id }) => {
  const { data: board, isLoading, error } = useGetBoardByIdQuery(id);
  const { data: members } = useGetBoardsMembersByIdQuery(id);
  const navigate = useNavigate();
  const boardClick = () => {
    navigate(routerPaths.navigateTrelloDetail(id));
  };

  if (isLoading)
    return (
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{ minHeight: "150px" }}
      />
    );

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

  if (error && typeof error === "string")
    return (
      <Card>
        <BoardErrorContent>
          <Typography color="error" variant="subtitle2">
            {error}
          </Typography>
        </BoardErrorContent>
      </Card>
    );
};

export default BoardCard;
