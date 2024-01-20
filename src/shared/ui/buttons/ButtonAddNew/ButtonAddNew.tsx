import React, { FC } from "react";
import { SxProps } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface Props {
  title: string;
  isLoading: boolean;
  onClick: () => void;
  sx?: SxProps;
}

const ButtonAddNew: FC<Props> = ({ title, isLoading, onClick, sx = {} }) => {
  return (
    <LoadingButton
      loadingPosition="start"
      loading={isLoading}
      startIcon={<AddCircleOutlineIcon />}
      onClick={onClick}
      sx={{ whiteSpace: "nowrap", ...sx }}
    >
      {title}
    </LoadingButton>
  );
};

export default ButtonAddNew;
