import React from "react";
import { useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import st from "./TrelloBoardDetailPage.module.scss";
import HeadSkeletons from "./HeadSkeletons";
import SheetsSkeletons from "./SheetsSkeletons";
import ActionsSkeletons from "./ActionsSkeletons";
import { ButtonBack, DetailCategory } from "@/shared/ui";

import {
  useGetAllListByBoardIdQuery,
  useGetBoardByIdQuery,
} from "@/entities/trello-board";
import { TrelloBoardEditDescription } from "@/features/trello-board-edit-description";
import { TrelloBoardEditTitle } from "@/features/trello-board-edit-title";
import { TrelloBoardDelete } from "@/features/trello-board-delete";
import { TrelloList } from "@/widgets/trello-list";

const TrelloBoardDetailPage = () => {
  const params = useParams<{ id: string }>();
  const { data: board, isLoading: boardLoading } = useGetBoardByIdQuery(
    params.id || ""
  );
  const { data: lists, isLoading: listsLoading } = useGetAllListByBoardIdQuery(
    params.id || ""
  );

  const seeBoardClick = () => {
    window.open(board?.url || "", "_blank");
  };

  return (
    <div className={`container ${st.detail}`}>
      <ButtonBack />
      {boardLoading && <HeadSkeletons />}
      {board && (
        <Box marginTop={"16px"}>
          <TrelloBoardEditTitle board={board} />
          <TrelloBoardEditDescription board={board} />
        </Box>
      )}
      {listsLoading && <SheetsSkeletons />}

      {lists && (
        <Box marginTop={"16px"}>
          <DetailCategory>your sheets</DetailCategory>
          {lists.map((list, idx) => (
            <TrelloList list={list} key={list.id} expanded={idx === 0} />
          ))}
        </Box>
      )}

      {board && (
        <Box marginTop={"16px"}>
          <DetailCategory>board actions</DetailCategory>
          <Button
            color="secondary"
            startIcon={<OpenInNewIcon />}
            onClick={seeBoardClick}
          >
            see board
          </Button>
          <TrelloBoardDelete />
        </Box>
      )}
      {boardLoading && <ActionsSkeletons />}
    </div>
  );
};

export default TrelloBoardDetailPage;
