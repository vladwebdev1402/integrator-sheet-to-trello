import React, { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
} from "@mui/material";
import SegmentIcon from "@mui/icons-material/Segment";
import DescriptionIcon from "@mui/icons-material/Description";

import { CSheetCard } from "@/shared/types";
import { IEditFuatureObjectProps } from "@/shared/ui";
import { ICardDeleteProps, ICardShiftProps } from "./featureProps";

interface Props {
  card: CSheetCard;
  TitleEdit: FC<IEditFuatureObjectProps<CSheetCard>>;
  DescriptionEdit: FC<IEditFuatureObjectProps<CSheetCard>>;
  CardDelete: FC<ICardDeleteProps>;
  CardShift: FC<ICardShiftProps>;
}

const SheetCard: FC<Props> = ({
  card,
  TitleEdit,
  DescriptionEdit,
  CardDelete,
  CardShift,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [isDescEdit, setIsDescEdit] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Card>
        <CardActionArea sx={{ height: "100%" }} onClick={handleOpen}>
          <CardContent sx={{ height: "100%" }}>
            <Typography variant="body1">{card.title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {isOpen && (
        <Dialog open={isOpen} onClose={handleClose} maxWidth={"md"} fullWidth>
          <DialogTitle>
            {!isTitleEdit && card.title}
            <TitleEdit
              isEdit={isTitleEdit}
              setIsEdit={setIsTitleEdit}
              currentValue={card}
            />
          </DialogTitle>
          <DialogContent>
            <Box>
              <Box display="flex" gap="12px" alignItems="center">
                <DescriptionIcon />
                <Typography variant="overline" fontWeight={500} fontSize="15px">
                  Description
                </Typography>
              </Box>
              <Box paddingTop={"8px"}>
                {!isDescEdit && (
                  <Typography
                    variant="body1"
                    sx={{ cursor: "pointer" }}
                    onClick={() => setIsDescEdit(true)}
                  >
                    {card.description || "Add description"}
                  </Typography>
                )}
                <DescriptionEdit
                  isEdit={isDescEdit}
                  setIsEdit={setIsDescEdit}
                  currentValue={card}
                />
              </Box>
            </Box>
            <Box marginTop={"24px"}>
              <Box display="flex" gap="12px" alignItems="center">
                <SegmentIcon />
                <Typography variant="overline" fontWeight={500} fontSize="15px">
                  sheet
                </Typography>
              </Box>
              <CardShift card={card} />
            </Box>
          </DialogContent>
          <DialogActions>
            <CardDelete closeDialog={handleClose} card={card} />
            <Button onClick={handleClose} variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default SheetCard;
