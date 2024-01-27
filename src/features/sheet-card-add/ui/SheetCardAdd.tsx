import { FC } from "react";
import { useParams } from "react-router-dom";
import { useAddNewCardMutation } from "@/entities/spreedsheet";
import { CardAdd } from "@/shared/ui";
interface Props {
  sheetId: number;
  countCards: number;
}

const SheetCardAdd: FC<Props> = ({ sheetId, countCards }) => {
  const params = useParams<{ id: string }>();
  const [addCard] = useAddNewCardMutation();

  const addClick = (value: string) => {
    if (params.id)
      addCard({
        spreadsheetId: params.id,
        sheetId,
        countCards,
        name: value,
      });
  };

  return <CardAdd addCallback={addClick} />;
};

export default SheetCardAdd;
