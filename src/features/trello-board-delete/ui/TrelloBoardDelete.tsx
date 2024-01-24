import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { ButtonDelete } from "@/shared/ui";
import { useDeleteBoardMutation } from "@/entities/trello-board";
import { routerPaths } from "@/shared/constants";

const TrelloBoardDelete = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [deleteBoard, { isLoading, isSuccess, error }] =
    useDeleteBoardMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBar, setIsOpenBar] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    if (!isLoading) setIsOpen(false);
  };

  const deleteClick = () => {
    deleteBoard(params?.id || "");
  };

  useEffect(() => {
    if (isSuccess) navigate(routerPaths.trello);
  }, [isSuccess, navigate]);

  useEffect(() => {
    setIsOpenBar(true);
  }, [error]);

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Do you really want to delete the board?</DialogTitle>
        <DialogContent>
          Once deleted, the board cannot be restored.
        </DialogContent>
        <DialogActions>
          <LoadingButton
            color="error"
            onClick={deleteClick}
            loading={isLoading}
          >
            delete
          </LoadingButton>
          <Button
            variant="contained"
            onClick={handleClose}
            disabled={isLoading}
          >
            close
          </Button>
        </DialogActions>
      </Dialog>
      <ButtonDelete onClick={handleOpen}>delete board</ButtonDelete>
      {error && (
        <Snackbar
          open={isOpenBar}
          autoHideDuration={5000}
          onClose={() => setIsOpenBar(false)}
          message={typeof error === "string" ? error : ""}
        />
      )}
    </>
  );
};

export default TrelloBoardDelete;
