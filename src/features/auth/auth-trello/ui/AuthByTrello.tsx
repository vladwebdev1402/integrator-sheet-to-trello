import React, { useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import PersonIcon from "@mui/icons-material/Person";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { saveTrelloToken } from "@/entities/user-trello";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { environment, routerPaths } from "@/shared/constants";

const AuthByTrello = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();

  const trelloToken =
    window.location.hash.split("=").at(-1) || queryParams.get("trelloToken");

  const { isLoading } = useAppSelector((state) => state.AuthTrelloReducer);

  const AuthClick = () => {
    const url =
      environment.trelloAuthUrl +
      createSearchParams(environment.trelloQuery).toString();
    window.location.href = url;
  };

  useEffect(() => {
    if (trelloToken !== null) {
      queryParams.delete("trelloToken");
      dispatch(saveTrelloToken(trelloToken));
      navigate({
        pathname: routerPaths.profile,
        search: createSearchParams(queryParams).toString(),
      });
    }
  }, [trelloToken, queryParams, dispatch, navigate]);

  return (
    <LoadingButton
      variant="contained"
      loadingPosition="start"
      startIcon={<PersonIcon />}
      onClick={AuthClick}
      loading={isLoading}
      color="secondary"
    >
      {isLoading ? `Authrozation...` : `Authrozation`}
    </LoadingButton>
  );
};

export default AuthByTrello;
