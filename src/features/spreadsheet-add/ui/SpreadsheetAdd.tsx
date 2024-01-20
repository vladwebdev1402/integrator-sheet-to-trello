import React, { useEffect } from "react";
import { useCreateNewSpreadSheetMutation } from "@/entities/spreedsheet";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { routerPaths } from "@/shared/constants";

const SpreadsheetAdd = () => {
  const navigate = useNavigate();
  const [createNewTable, { isLoading, data }] =
    useCreateNewSpreadSheetMutation();

  const createClick = () => {
    createNewTable(null);
  };

  useEffect(() => {
    if (data) navigate(routerPaths.navigateSheetDetail(data.spreadsheetId));
  }, [data, navigate]);

  return (
    <LoadingButton
      fullWidth
      variant="contained"
      loading={isLoading}
      sx={{ marginTop: "8px" }}
      onClick={createClick}
    >
      Create new spreadsheet
    </LoadingButton>
  );
};

export default SpreadsheetAdd;
