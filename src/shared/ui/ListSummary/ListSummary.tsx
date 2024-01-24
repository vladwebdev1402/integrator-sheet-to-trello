import React, { FC } from "react";
import {
  Badge,
  CardActionArea,
  AccordionSummary,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  badgeContent: number;
  children: React.ReactNode;
  title: string;
  isEdit?: boolean;
}

const ListSummary: FC<Props> = ({
  badgeContent,
  children,
  title,
  isEdit = false,
}) => {
  const mediaSM = useMediaQuery("(max-width: 568px)");
  return (
    <Badge
      color="info"
      showZero
      anchorOrigin={{
        horizontal: "left",
        vertical: "top",
      }}
      badgeContent={badgeContent}
      sx={{ width: "100%" }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ width: "100%" }}
        focusVisibleClassName="123123"
      >
        {children}
        <Typography
          fontWeight={500}
          fontSize={mediaSM ? "17px" : "20px"}
          variant="body1"
          component="div"
          sx={{ width: "100%" }}
        >
          {!isEdit && title}
          {children}
        </Typography>
        {!isEdit && (
          <CardActionArea
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              left: 0,
              top: 0,
            }}
          ></CardActionArea>
        )}
      </AccordionSummary>
    </Badge>
  );
};

export default ListSummary;
