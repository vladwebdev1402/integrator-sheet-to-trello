import { FC, useState } from "react";
import { Box } from "@mui/material";
import { SpreadsheetEditName } from "@/features/spreadsheet-edit-name";
import { DetailCategory, DetailPageTitle } from "@/shared/ui";

interface Props {
  title: string;
}

const NameSpreadsheet: FC<Props> = ({ title }) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <DetailCategory sx={{ padding: "96px 0px 0px 12px" }}>
        spreadsheet name
      </DetailCategory>
      <Box display={"flex"} gap={"5px"} padding="0" alignItems={"center"}>
        {!isEdit && <DetailPageTitle>{title}</DetailPageTitle>}
        <SpreadsheetEditName
          currentValue={title}
          setEdit={setIsEdit}
          isEdit={isEdit}
        />
      </Box>
    </>
  );
};

export default NameSpreadsheet;
