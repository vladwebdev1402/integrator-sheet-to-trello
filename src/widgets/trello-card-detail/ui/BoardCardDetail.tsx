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

import { formateDateDiff } from "@/shared/lib/formateDateDiff";
import {
  CardDescTitle,
  CardSheetTitle,
  CardShiftInsideTitle,
  Label,
} from "@/shared/ui";
import { TrelloCardRename } from "@/features/trello-card-rename";
import { TrelloCardEditDesc } from "@/features/trello-card-edit-desc";
import { TrelloCardDelete } from "@/features/trello-card-delete";
import { TrelloCardShift } from "@/features/trello-card-shift";
import { TrelloCardShiftInside } from "@/features/trello-card-shift-inside";
import { BoardCardComments } from "@/entities/board-card-comments";
import { BoardCardMembers } from "@/entities/board-card-members";
import { useGetAllCardsByBoardIdQuery } from "@/entities/trello-board";
import Skeletons from "./Skeletons";

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
            <Box display="flex" gap="5px" flexWrap="wrap">
              {card.labels.map((label) => (
                <Label key={label.id} color={label.color}>
                  {label.name}
                </Label>
              ))}
            </Box>
            <BoardCardMembers />
            <Box>
              <CardDescTitle />
              <TrelloCardEditDesc card={card} />
            </Box>
            <Box marginTop="24px">
              <CardSheetTitle title="Column" />
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
