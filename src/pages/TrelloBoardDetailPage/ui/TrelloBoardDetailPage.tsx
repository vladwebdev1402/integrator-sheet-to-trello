import React from "react";
import { Box, Typography } from "@mui/material";

import st from "./TrelloBoardDetailPage.module.scss";
import { ButtonBack, DetailCategory, DetailPageTitle } from "@/shared/ui";
import { useParams } from "react-router-dom";
import { useGetBoardByIdQuery } from "@/entities/trello-board";
import { TrelloBoardEditTitle } from "@/features/trello-board-edit-title";
import TrelloBoardEditDescription from "@/features/trello-board-edit-description/ui/TrelloBoardEditDescription";

const TrelloBoardDetailPage = () => {
  const params = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetBoardByIdQuery(params.id || "");

  return (
    <div className={`container ${st.detail}`}>
      <ButtonBack />

      {data && (
        <Box marginTop={"16px"}>
          <TrelloBoardEditTitle board={data} />
          <TrelloBoardEditDescription board={data} />
        </Box>
      )}

      {data && (
        <Box marginTop={"16px"}>
          <DetailCategory>your sheets</DetailCategory>
        </Box>
      )}

      {data && (
        <Box marginTop={"16px"}>
          <DetailCategory>board actions</DetailCategory>
        </Box>
      )}
    </div>
  );
};

export default TrelloBoardDetailPage;
