import React from "react";
import { LoadingButton } from "@mui/lab";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutGoogle } from "@/entities/user-google";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
const LogoutGoogle = () => {
  const { isLoading } = useAppSelector((state) => state.AuthGoogleReducer);
  const dispatch = useAppDispatch();

  const logoutBtnClick = () => {
    dispatch(logoutGoogle(null));
  };

  return (
    <LoadingButton
      loading={isLoading}
      variant="contained"
      loadingPosition="start"
      startIcon={<LogoutIcon />}
      color="error"
      onClick={logoutBtnClick}
    >
      Logout
    </LoadingButton>
  );
};

export default LogoutGoogle;
