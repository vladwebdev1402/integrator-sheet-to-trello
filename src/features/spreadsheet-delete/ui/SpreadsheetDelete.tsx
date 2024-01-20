import React, { FC, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  useMediaQuery,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { ButtonDelete } from "@/shared/ui";
import { routerPaths } from "@/shared/constants";
import { useDeleteSpreadSheetMutation } from "@/entities/spreedsheet";

const SpreadsheetDelete: FC = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mediaMD = useMediaQuery("(max-width: 768px)");
  const [open, setOpen] = useState(false);

  const [deleteSpredsheet, { isLoading, isSuccess }] =
    useDeleteSpreadSheetMutation();

  const deleteClick = () => {
    if (params.id) deleteSpredsheet({ id: params.id });
  };

  useEffect(() => {
    if (isSuccess) navigate(routerPaths.google);
  }, [isSuccess, navigate]);

  return (
    <>
      <ButtonDelete
        onClick={() => setOpen(!open)}
        sx={{ flex: mediaMD ? "1 1 150px" : "" }}
      >
        delete table
      </ButtonDelete>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Do you really want to delete the spreadsheet?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once deleted, the spreadsheet cannot be restored.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            loading={isLoading}
            onClick={deleteClick}
            variant="contained"
            color="error"
          >
            delete
          </LoadingButton>
          <Button onClick={() => setOpen(false)} autoFocus>
            close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SpreadsheetDelete;
