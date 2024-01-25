import { EditValue } from "@/shared/ui";
import React, { FC } from "react";
import { useMediaQuery } from "@mui/material";
import { useUpadteListMutation } from "@/entities/trello-board";
import { IBoardList } from "@/shared/types/IBoardList";
interface Props {
  list: IBoardList;
  setIsEdit: (value: boolean) => void;
  isEdit: boolean;
}

const TrelloListRename: FC<Props> = ({ list, setIsEdit, isEdit }) => {
  const [update, { isLoading }] = useUpadteListMutation();

  const callbackRename = (value: string) => {
    update({
      ...list,
      name: value,
    });
  };

  const mediaSM = useMediaQuery("(max-width: 568px)");

  return (
    <EditValue
      isEdit={isEdit}
      currentValue={list.name}
      setIsEdit={setIsEdit}
      callbackUpdate={callbackRename}
      visibleEditIcon={false}
      inputProps={{ fontSize: mediaSM ? "17px" : "20px", fontWeight: "500" }}
      isLoading={isLoading}
    />
  );
};

export default TrelloListRename;
