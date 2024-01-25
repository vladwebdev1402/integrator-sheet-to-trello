import React, { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Box,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllCardsByBoardIdQuery } from "@/entities/trello-board";
import { TrelloCardRename } from "@/features/trello-card-rename";
import { CardDescTitle } from "@/shared/ui";
import { TrelloCardEditDesc } from "@/features/trello-card-edit-desc";
import { TrelloCardDelete } from "@/features/trello-card-delete";

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
      <DialogContent>
        {card && (
          <Box>
            <CardDescTitle />
            <TrelloCardEditDesc card={card} />
          </Box>
        )}
      </DialogContent>

      <DialogActions>{card && <TrelloCardDelete card={card} />}</DialogActions>
    </Dialog>
  );
};

export default BoardCardDetail;
