import React from "react";
import { Box } from "@mui/material";

import st from "./TrelloBoardDetailPage.module.scss";
import { ButtonBack, DetailCategory } from "@/shared/ui";
import { useParams } from "react-router-dom";
import {
  useGetAllListByBoardIdQuery,
  useGetBoardByIdQuery,
} from "@/entities/trello-board";
import { TrelloBoardEditTitle } from "@/features/trello-board-edit-title";
import TrelloBoardEditDescription from "@/features/trello-board-edit-description/ui/TrelloBoardEditDescription";
import HeadSkeletons from "./HeadSkeletons";
import SheetsSkeletons from "./SheetsSkeletons";
import ActionsSkeletons from "./ActionsSkeletons";
import { TrelloList } from "@/widgets/trello-list";

const TrelloBoardDetailPage = () => {
  const params = useParams<{ id: string }>();
  const { data: board, isLoading: boardLoading } = useGetBoardByIdQuery(
    params.id || ""
  );
  const { data: lists, isLoading: listsLoading } = useGetAllListByBoardIdQuery(
    params.id || ""
  );
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
        </Box>
      )}
      {boardLoading && <ActionsSkeletons />}
    </div>
  );
};

export default TrelloBoardDetailPage;
