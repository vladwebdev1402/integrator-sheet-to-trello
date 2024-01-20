import React, { FC } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface Props {
  title: string;
  isLoading: boolean;
  onClick: () => void;
}

const ButtonAddNew: FC<Props> = ({ title, isLoading, onClick }) => {
  return (
    <LoadingButton
      loadingPosition="start"
      loading={isLoading}
      startIcon={<AddCircleOutlineIcon />}
      onClick={onClick}
    >
      {title}
    </LoadingButton>
  );
};

export default ButtonAddNew;
