import React, { FC } from "react";
import { SxProps } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";
interface Props {
  children: React.ReactNode;
  onClick: () => void;
  isLoading?: boolean;
  sx?: SxProps;
  className?: string;
  visibleIcon?: boolean;
}

const ButtonDelete: FC<Props> = ({
  onClick,
  children,
  isLoading = false,
  sx = {},
  className = "",
  visibleIcon = true,
}) => {
  return (
    <LoadingButton
      className={className}
      sx={{ whiteSpace: "nowrap", ...sx }}
      onClick={onClick}
      variant="outlined"
      color="error"
      startIcon={visibleIcon ? <DeleteIcon /> : <></>}
      loading={isLoading}
      loadingPosition="start"
    >
      {children}
    </LoadingButton>
  );
};

export default ButtonDelete;
