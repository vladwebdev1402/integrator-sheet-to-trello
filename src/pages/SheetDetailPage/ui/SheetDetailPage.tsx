import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import st from "./SheetDetailPage.module.scss";
import { SheetList } from "@/widgets/sheet-list";
import { useGetSpreadSheetByIdQuery } from "@/entities/spreedsheet";
import { ButtonBack } from "@/shared/ui";
import Skeletons from "./Skeletons";
import { SheetListAdd } from "@/features/sheet-list-add";
import NameSpreadsheet from "./NameSpreadsheet";
const SheetDetailPage = () => {
  const params = useParams<{ id: string }>();
  const { data, isLoading, isFetching } = useGetSpreadSheetByIdQuery(
    params?.id ?? "no-id"
  );

  const countSheets = useMemo(() => {
    return data && data.sheets ? data.sheets.length : 0;
  }, [data]);

  return (
    <div className={`container ${st.sheet}`}>
      <ButtonBack />
      {isLoading && <Skeletons />}
      {data && <NameSpreadsheet title={data.properties.title} />}
      <Box sx={{ marginTop: "48px" }}>
        {data &&
          data.sheets.map(({ properties: sheet }, idx) => (
            <SheetList
              title={sheet.title}
              sheetId={sheet.sheetId}
              expanded={idx === 0}
              visibleDelete={countSheets > 1}
              key={sheet.sheetId}
            />
          ))}
        {!isLoading && (
          <SheetListAdd count={countSheets} isUpdating={isFetching} />
        )}
      </Box>
    </div>
  );
};

export default SheetDetailPage;
