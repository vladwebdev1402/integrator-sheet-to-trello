import { Container, Typography } from "@mui/material";

import { useGoogleAuth, useTrelloAuth } from "@/features/auth";
import { Converter } from "@/widgets/converter";

const MainPage = () => {
  useGoogleAuth();
  useTrelloAuth();

  return (
    <Container className={`container`}>
      <Typography textAlign={"center"} variant="h3" marginTop="48px">
        Converter
      </Typography>
      <Converter />
    </Container>
  );
};

export default MainPage;
