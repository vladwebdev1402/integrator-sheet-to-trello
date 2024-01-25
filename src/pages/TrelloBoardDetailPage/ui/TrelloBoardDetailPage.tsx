import React, { useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";
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
import { TrelloListAdd } from "@/features/trello-list-add";
import TrelloListArchive from "@/widgets/trello-list-archive/ui/TrelloListArchive";

const TrelloBoardDetailPage = () => {
  const params = useParams<{ id: string }>();
  const { data: board, isLoading: boardLoading } = useGetBoardByIdQuery(
    params.id || ""
  );
  const {
    data: lists,
    isLoading: listsLoading,
    isFetching,
  } = useGetAllListByBoardIdQuery(params.id || "");

  const openLists = useMemo(() => {
    return lists?.filter((list) => list.closed === false) ?? [];
  }, [lists]);

  const archiveLists = useMemo(() => {
    return lists?.filter((list) => list.closed === true) ?? [];
  }, [lists]);

  const seeBoardClick = () => {
    window.open(board?.url || "", "_blank");
  };

  return (
    <>
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
            {openLists.map((list, idx) => (
              <TrelloList list={list} key={list.id} expanded={idx === 0} />
            ))}
            <TrelloListAdd isUpdating={isFetching} />
          </Box>
        )}

        {lists && archiveLists.length > 0 && (
          <Box marginTop={"16px"}>
            <DetailCategory>your archive sheets</DetailCategory>
            {archiveLists.map((list, idx) => (
              <TrelloListArchive list={list} key={list.id} />
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
      <Outlet />
    </>
  );
};

export default TrelloBoardDetailPage;
