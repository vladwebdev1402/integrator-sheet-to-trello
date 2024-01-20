import React, { FC } from "react";
import {
  AccordionSummary,
  CardActionArea,
  Typography,
  Badge,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SheetListRename } from "@/features/sheet-list-rename";

interface Props {
  title: string;
  sheetId: number;
  countCards: number;
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
}

const ListHead: FC<Props> = ({
  title,
  sheetId,
  countCards,
  isEdit,
  setIsEdit,
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
      badgeContent={countCards}
      sx={{ width: "100%" }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ width: "100%" }}
        focusVisibleClassName="123123"
      >
        <Typography
          fontWeight={500}
          fontSize={mediaSM ? "17px" : "20px"}
          variant="body1"
          sx={{ width: "100%" }}
        >
          {!isEdit && title}
          <SheetListRename
            currentValue={title}
            isEdit={isEdit}
            setEdit={setIsEdit}
            sheetId={sheetId}
          />
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

export default ListHead;
