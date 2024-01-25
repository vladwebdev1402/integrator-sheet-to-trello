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
  position: "relative",
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
}))

export const BoardDescription = styled(Typography)<TypographyProps>(() => ({
  display: "-webkit-box",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  color: "white",
}));

export const BoardErrorContent = styled(CardContent)<CardContentProps>(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "150px",
  backgroundColor: "rgba(1, 1, 1, 0.2)"
}));