import React, { FC } from "react";
import { Button } from "@mui/material";

interface Props {
  idx: number;
  closeDialog: () => void;
}

const SheetCardDelete: FC<Props> = ({ idx, closeDialog }) => {
  return (
    <Button color="error" onClick={closeDialog}>
      delete
    </Button>
  );
};

export default SheetCardDelete;
