import React, { useMemo } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllCardsByBoardIdQuery } from "@/entities/trello-board";
import { TrelloCardRename } from "@/features/trello-card-rename";

const BoardCardDetail = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string; cardId: string }>();
  const { currentData, isLoading } = useGetAllCardsByBoardIdQuery(
    params?.id ?? ""
  );

  const card = useMemo(() => {
    return currentData
      ? currentData.filter((card) => card.id === params?.cardId ?? "")[0]
      : undefined;
  }, [params, currentData]);

  const handleClose = () => {
    navigate(-1);
  };
  return (
    <Dialog open={true} onClose={handleClose} maxWidth={"md"} fullWidth>
      <DialogTitle>
        {currentData && card && <TrelloCardRename card={card} />}
      </DialogTitle>
    </Dialog>
  );
};

export default BoardCardDetail;
