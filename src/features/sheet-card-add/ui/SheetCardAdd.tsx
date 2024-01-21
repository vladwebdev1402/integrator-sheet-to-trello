import React, { FC } from "react";
import { Card, Box, CardContent } from "@mui/material";
import { ButtonAddNew } from "@/shared/ui";
import { useParams } from "react-router-dom";
import { useAddNewCardMutation } from "@/entities/spreedsheet";

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
      <CardContent>
        <Box alignItems={"center"} justifyContent={"center"} display={"flex"}>
          <ButtonAddNew
            isLoading={false}
            title="add new card"
            onClick={addClick}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SheetCardAdd;
