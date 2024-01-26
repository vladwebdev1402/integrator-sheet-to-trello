import React, { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllCardsByBoardIdQuery } from "@/entities/trello-board";
import { TrelloCardRename } from "@/features/trello-card-rename";
import {
  CardDescTitle,
  CardSheetTitle,
  CardShiftInsideTitle,
} from "@/shared/ui";
import { TrelloCardEditDesc } from "@/features/trello-card-edit-desc";
import { TrelloCardDelete } from "@/features/trello-card-delete";
import { TrelloCardShift } from "@/features/trello-card-shift";
import { TrelloCardShiftInside } from "@/features/trello-card-shift-inside";
import Skeletons from "./Skeletons";
import { BoardCardComments } from "@/entities/board-card-comments";
import { formateDateDiff } from "@/shared/lib/formateDateDiff";

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
    <Dialog
      open={true}
      onClose={handleClose}
      maxWidth={"sm"}
      fullWidth
      scroll="body"
    >
      {isLoading && <Skeletons />}
      <DialogTitle>
        {currentData && card && (
          <>
            <Typography variant="body2">
              Last activity: {formateDateDiff(card.dateLastActivity)}
            </Typography>
            <TrelloCardRename card={card} />
          </>
        )}
        {!isLoading && card === undefined && "This card does not exist"}
      </DialogTitle>
      <DialogContent>
        {card && (
          <>
            <Box>
              <CardDescTitle />
              <TrelloCardEditDesc card={card} />
            </Box>
            <Box marginTop="24px">
              <CardSheetTitle />
              <TrelloCardShift card={card} />
            </Box>
            <Box marginTop="24px">
              <CardShiftInsideTitle />
              <TrelloCardShiftInside card={card} />
            </Box>
            <BoardCardComments />
          </>
        )}
      </DialogContent>

      <DialogActions>
        {!isLoading && (
          <Button variant="contained" onClick={handleClose}>
            close
          </Button>
        )}
        {card && <TrelloCardDelete card={card} />}
      </DialogActions>
    </Dialog>
  );
};

export default BoardCardDetail;
