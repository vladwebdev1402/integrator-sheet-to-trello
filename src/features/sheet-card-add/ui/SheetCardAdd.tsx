import React, { FC } from "react";
import { Card, Box, CardContent } from "@mui/material";
import { ButtonAddNew } from "@/shared/ui";
import { useParams } from "react-router-dom";
import { useAddNewCardMutation } from "@/entities/spreedsheet";

interface Props {
  isUpdating: boolean;
  sheetTitle: string;
}

const SheetCardAdd: FC<Props> = ({ isUpdating, sheetTitle }) => {
  const params = useParams<{ id: string }>();
  const [addCard, { isLoading }] = useAddNewCardMutation();

  const addClick = () => {
    if (params.id)
      addCard({
        spreadsheetId: params.id,
        sheetTitle,
      });
  };

  return (
    <Card>
      <CardContent>
        <Box alignItems={"center"} justifyContent={"center"} display={"flex"}>
          <ButtonAddNew
            isLoading={isLoading || isUpdating}
            title="add new card"
            onClick={addClick}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SheetCardAdd;
