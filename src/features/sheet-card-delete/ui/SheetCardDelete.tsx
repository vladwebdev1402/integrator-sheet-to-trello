import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDeleteCardMutation } from "@/entities/spreedsheet";
import { CSheetCard } from "@/shared/types";
import { ButtonDelete } from "@/shared/ui";

interface Props {
  card: CSheetCard;
  closeDialog: () => void;
}

const SheetCardDelete: FC<Props> = ({ card, closeDialog }) => {
  const params = useParams<{ id: string }>();
  const [deleteCard, { isLoading, isSuccess }] = useDeleteCardMutation();

  const deleteClick = () => {
    deleteCard({
      idx: card.idx,
      sheetId: card.sheetId,
      spreadsheetId: params?.id ?? "no-id",
    });
  };

  useEffect(() => {
    if (isSuccess) closeDialog();
  }, [isSuccess]);

  return (
    <ButtonDelete isLoading={isLoading} onClick={deleteClick}>
      delete
    </ButtonDelete>
  );
};

export default SheetCardDelete;
