import {
  Typography,
  TypographyProps,
  CardContent,
  CardContentProps,
  Box,
  BoxProps,
  CardMedia,
  CardMediaProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const BoardContent = styled(CardContent)<CardContentProps>(() => ({
  height: "100%",
  zIndex: "3",
  display: "flex",
  flexDirection: "column",
}));

export const BoardFade = styled(Box)<BoxProps>(() => ({
  position: "absolute",
  opacity: "0.6",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "#00000026",
}));

export const BoardMedia = styled(CardMedia)<CardMediaProps>(() => ({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  zIndex: "-1",
}));

export const BoardName = styled(Typography)<TypographyProps>(() => ({
  color: "white",
  height: "48px"
}))

export const BoardDescription = styled(Typography)<TypographyProps>(() => ({
  display: "-webkit-box",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  flex: "0 1 100%",
  color: "white",
}));

