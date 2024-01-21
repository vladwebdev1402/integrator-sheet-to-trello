import React, { FC } from "react";
import { useParams } from "react-router-dom";
import {
  useDeleteCardMutation,
  useGetSheetByIdQuery,
} from "@/entities/spreedsheet";
import { CSheetCard } from "@/shared/types";
import { ButtonDelete } from "@/shared/ui";

interface Props {
  card: CSheetCard;
  closeDialog: () => void;
}

const SheetCardDelete: FC<Props> = ({ card, closeDialog }) => {
  const params = useParams<{ id: string }>();
  const [deleteCard, { isLoading }] = useDeleteCardMutation();
  const { isFetching } = useGetSheetByIdQuery({
    sheetId: card.sheetId,
    spreadsheetId: params?.id ?? "no-id",
  });

  const deleteClick = () => {
    deleteCard({
      idx: card.idx,
      sheetId: card.sheetId,
      spreadsheetId: params?.id ?? "no-id",
    });
    closeDialog();
  };

  return (
    <ButtonDelete isLoading={isLoading || isFetching} onClick={deleteClick}>
      delete
    </ButtonDelete>
  );
};

export default SheetCardDelete;
