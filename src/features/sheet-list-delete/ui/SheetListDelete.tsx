import React, { FC, useState } from "react";
import { Snackbar } from "@mui/material";
import { ButtonDelete } from "@/shared/ui";
import { useDeleteListMutation } from "@/entities/spreedsheet";
import { useParams } from "react-router-dom";

interface Props {
  sheetId: number;
  isUpdating: boolean;
  countCards: number;
}

const SheetListDelete: FC<Props> = ({ sheetId, isUpdating, countCards }) => {
  const params = useParams<{ id: string }>();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [deleteList, { isLoading }] = useDeleteListMutation();

  const deleteClick = () => {
    if (params.id && countCards === 0)
      deleteList({
        spreadsheetId: params.id,
        sheetId,
      });
    else setOpenSnackbar(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <>
      <ButtonDelete onClick={deleteClick} isLoading={isLoading || isUpdating}>
        delete this list
      </ButtonDelete>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message="Please, delete all cards on this list to delete."
      />
    </>
  );
};

export default SheetListDelete;
