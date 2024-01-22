import React, { FC } from "react";
import { Card, CardContent } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useParams } from "react-router-dom";
import { useAddNewCardMutation } from "@/entities/spreedsheet";
import AddCardIcon from "@mui/icons-material/AddCard";
interface Props {
  sheetId: number;
  countCards: number;
}

const SheetCardAdd: FC<Props> = ({ sheetId, countCards }) => {
  const params = useParams<{ id: string }>();
  const [addCard] = useAddNewCardMutation();

  const addClick = () => {
    if (params.id)
      addCard({
        spreadsheetId: params.id,
        sheetId,
        countCards,
      });
  };

  return (
    <Card>
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingButton
          onClick={addClick}
          sx={{ whiteSpace: "nowrap" }}
          startIcon={<AddCardIcon />}
          loadingPosition="start"
        >
          add new card
        </LoadingButton>
      </CardContent>
    </Card>
  );
};

export default SheetCardAdd;
