import React from "react";
import { LoadingButton } from "@mui/lab";
import LogoutIcon from "@mui/icons-material/Logout";

import { logoutTrello } from "@/entities/user-trello";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";

const LogoutTrello = () => {
  const { isLoading } = useAppSelector((state) => state.AuthTrelloReducer);
  const dispatch = useAppDispatch();
  const logoutBtnClick = () => {
    dispatch(logoutTrello(null));
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

export default LogoutTrello;
