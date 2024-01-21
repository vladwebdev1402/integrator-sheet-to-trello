import React, { FC, useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";

import st from "./SheetList.module.scss";
import Skeletons from "./Skeletons";
import { useGetSheetByIdQuery } from "@/entities/spreedsheet";
import { SheetCard } from "@/entities/sheet-card";
import { SheetCardAdd } from "@/features/sheet-card-add";
import { SheetListDelete } from "@/features/sheet-list-delete";
import ListHead from "./ListHead";

interface Props {
  sheetId: number;
  title: string;
  visibleDelete: boolean;
  expanded?: boolean;
}

const SheetList: FC<Props> = ({
  sheetId,
  title,
  visibleDelete,
  expanded = false,
}) => {
  const params = useParams<{ id: string }>();
  const [isEdit, setIsEdit] = useState(false);
  const { data, isLoading, isFetching } = useGetSheetByIdQuery({
    spreadsheetId: params?.id ?? "",
    sheetId: sheetId,
  });

  const countCards = useMemo(() => {
    return data ? data.length : 0;
  }, [data]);

  const renameClick = () => {
    setIsEdit(true);
  };
  return (
    <Accordion defaultExpanded={expanded}>
      <ListHead
        countCards={countCards}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        sheetId={sheetId}
        title={title}
      />
      <AccordionDetails className={st.sheet__cards}>
        {isLoading && expanded && <Skeletons />}
        {data &&
          data.map((card, idx) => (
            <SheetCard
              key={idx}
              card={{
                title: card[0] ? card[0] : "Name card is empty",
                description: card[1] ? card[1] : "",
              }}
            />
          ))}
        {!isLoading && (
          <SheetCardAdd sheetId={sheetId} countCards={countCards} />
        )}
      </AccordionDetails>
      {!isLoading && (
        <AccordionActions>
          <Button
            startIcon={<EditIcon />}
            variant="outlined"
            onClick={renameClick}
          >
            rename
          </Button>
          {visibleDelete && (
            <SheetListDelete
              sheetId={sheetId}
              isUpdating={isFetching}
              countCards={countCards}
            />
          )}
        </AccordionActions>
      )}
    </Accordion>
  );
};

export default SheetList;
