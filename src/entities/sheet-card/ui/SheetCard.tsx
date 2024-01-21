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

import DescriptionIcon from "@mui/icons-material/Description";

import { CSheetCard } from "../lib/ClassSheetCard";
import { IEditFuatureProps } from "@/shared/ui";
import { ICardDeleteProps } from "./featureProps";

interface Props {
  card: CSheetCard;
  TitleEdit: FC<IEditFuatureProps>;
  DescriptionEdit: FC<IEditFuatureProps>;
  CardDelete: FC<ICardDeleteProps>;
}

const SheetCard: FC<Props> = ({
  card,
  TitleEdit,
  DescriptionEdit,
  CardDelete,
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
              currentValue={card.title}
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
                  currentValue={card.description}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <CardDelete closeDialog={handleClose} idx={card.id} />
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
