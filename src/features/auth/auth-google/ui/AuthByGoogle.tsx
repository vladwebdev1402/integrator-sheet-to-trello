import React, { useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

import {
  environment,
  routerPaths,
  useAppDispatch,
  useAppSelector,
} from "@/shared";
import { authGoogleWithCode } from "@/entities/user-google";

const AuthByGoogle = () => {
  const { isLoading, isAuth } = useAppSelector(
    (state) => state.AuthGoogleReducer
  );
  const [queryParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const code = queryParams.get("code");
  const trelloToken = window.location.hash.split("=").at(-1);
  const AuthClick = () => {
    window.location.href = `${environment.authUrl}?${createSearchParams(
      environment.authQuery
    ).toString()}`;
  };

  useEffect(() => {
    if (code !== null) dispatch(authGoogleWithCode(code));
  }, [code, dispatch]);

  useEffect(() => {
    queryParams.delete("scope");
    queryParams.delete("code");
    queryParams.delete("state");
    queryParams.delete("prompt");
    queryParams.delete("authuser");
    if (trelloToken) queryParams.set("trelloToken", trelloToken);
    if (isAuth) {
      navigate({
        pathname: routerPaths.profile,
        search: createSearchParams(queryParams).toString(),
      });
    }
  }, [isAuth, dispatch, navigate, queryParams, trelloToken]);

  return (
    <LoadingButton
      variant="contained"
      loadingPosition="start"
      startIcon={<PersonIcon />}
      onClick={AuthClick}
      loading={isLoading}
    >
      {isLoading ? `Authrozation...` : `Authrozation`}
    </LoadingButton>
  );
};

export default AuthByGoogle;
