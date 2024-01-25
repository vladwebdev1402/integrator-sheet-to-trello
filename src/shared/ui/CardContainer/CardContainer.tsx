import React, { FC } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";

interface Props {
  title: string;
  onOpen: () => void;
  actions?: React.ReactNode;
}

const CardContainer: FC<Props> = ({ title, onOpen, actions = <></> }) => {
  return (
    <Card
      sx={{ position: "relative", display: "flex", flexDirection: "column" }}
    >
      <CardActionArea
        onClick={onOpen}
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: "0",
          top: "0",
        }}
      ></CardActionArea>
      <CardContent sx={{ flex: "1 1 100%" }}>
        <Typography variant="body1" component={"div"}>
          {title}
        </Typography>
      </CardContent>
      <CardActions>{actions}</CardActions>
    </Card>
  );
};

export default CardContainer;
