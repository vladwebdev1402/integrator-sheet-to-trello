import { LoadingButton } from "@mui/lab";
import { createSearchParams } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

import { useAppSelector } from "@/shared/hooks";
import { environment } from "@/shared/constants";
import { useGoogleAuth } from "../lib/useGoogleAuth";

const AuthByGoogle = () => {
  const { isLoading } = useAppSelector((state) => state.AuthGoogleReducer);
  const AuthClick = () => {
    window.location.href = `${environment.authUrl}?${createSearchParams(
      environment.authQuery
    ).toString()}`;
  };

  useGoogleAuth();

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
