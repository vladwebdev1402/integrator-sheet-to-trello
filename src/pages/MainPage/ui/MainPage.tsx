import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useGoogleAuth, useTrelloAuth } from "@/features/auth";
import { Converter } from "@/widgets/converter";
import { useAppSelector } from "@/shared/hooks";
import { routerPaths } from "@/shared/constants";

const MainPage = () => {
  const navigate = useNavigate();

  const authorizeClick = () => {
    navigate(routerPaths.profile);
  };
  const { isAuth: isTrelloAuth } = useAppSelector(
    (state) => state.AuthTrelloReducer
  );
  const { isAuth: isGoogleAuth } = useAppSelector(
    (state) => state.AuthGoogleReducer
  );

  useGoogleAuth();
  useTrelloAuth();

  return (
    <Container className={`container`}>
      {isTrelloAuth && isGoogleAuth && (
        <>
          <Typography textAlign={"center"} variant="h3" marginTop="48px">
            Converter
          </Typography>
          <Converter />
        </>
      )}
      {!isTrelloAuth || !isGoogleAuth ? (
        <Box textAlign="center">
          <Typography textAlign={"center"} variant="h5" marginTop="48px">
            You are not logged in to Google or Trello account
          </Typography>
          <Button
            onClick={authorizeClick}
            sx={{ margin: "25px" }}
            variant="contained"
          >
            Authorize
          </Button>
        </Box>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default MainPage;
