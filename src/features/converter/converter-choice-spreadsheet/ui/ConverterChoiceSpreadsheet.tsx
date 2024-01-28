import { FC } from "react";
import {
  FormControl,
  Select,
  SelectChangeEvent,
  MenuItem,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { ConverterSelectBox } from "@/shared/ui";
import { TServiceChoice } from "@/shared/types";
import { useGetAllSheetsQuery } from "@/entities/spreedsheet";

interface Props {
  setService: (value: TServiceChoice) => void;
  setFromChoice: (value: string) => void;
  setToChoice: (value: string) => void;
  choice: "to" | "from";
}

const ConverterChoiceSpreadsheet: FC<Props> = ({
  setFromChoice,
  setToChoice,
  setService,
  choice,
}) => {
  const { data, isLoading } = useGetAllSheetsQuery({ limit: 150, name: "" });

  const selectChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    if (value === "document") setService(value);
    if (choice === "from") setFromChoice(value);
    else setToChoice(value);
  };

  return (
    <ConverterSelectBox
      type="spredsheet"
      order={choice === "from" ? "forward" : "reverse"}
    >
      <FormControl sx={{ width: "230px" }}>
        <InputLabel>Spreadsheet</InputLabel>
        <Select
          label="Spreadsheet"
          onChange={selectChange}
          MenuProps={{ style: { maxHeight: "300px" } }}
        >
          {choice === "from" ? (
            <MenuItem value="document">Return to services</MenuItem>
          ) : (
            <MenuItem value="create">Create new board</MenuItem>
          )}
          {isLoading && (
            <MenuItem disabled>
              <CircularProgress size="24px" sx={{ margin: "0 auto" }} />
            </MenuItem>
          )}
          {data && data.files.length === 0 && (
            <MenuItem disabled>Spredsheets not found</MenuItem>
          )}
          {data &&
            data.files.map((file) => (
              <MenuItem key={file.id} value={file.id}>
                {file.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </ConverterSelectBox>
  );
};

export default ConverterChoiceSpreadsheet;
