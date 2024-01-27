import { LoadingButton } from "@mui/lab";
import PersonIcon from "@mui/icons-material/Person";
import { createSearchParams } from "react-router-dom";

import { useAppSelector } from "@/shared/hooks";
import { environment } from "@/shared/constants";
import { useTrelloAuth } from "../lib/useTrelloAuth";

const AuthByTrello = () => {
  const { isLoading } = useAppSelector((state) => state.AuthTrelloReducer);

  const AuthClick = () => {
    const url =
      environment.trelloAuthUrl +
      createSearchParams(environment.trelloQuery).toString();
    window.location.href = url;
  };

  useTrelloAuth();

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
