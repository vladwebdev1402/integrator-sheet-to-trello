import { FC, useEffect } from "react";
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
  toChoice: string;
  fromChoice: string;
  choice: "to" | "from";
}

const ConverterChoiceSpreadsheet: FC<Props> = ({
  setFromChoice,
  setToChoice,
  setService,
  toChoice,
  fromChoice,
  choice,
}) => {
  const { data, isLoading } = useGetAllSheetsQuery({ limit: 150, name: "" });

  const selectChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    if (value === "return") setService("");
    if (choice === "from") setFromChoice(value);
    else setToChoice(value);
  };

  useEffect(() => {
    if (choice === "from") setFromChoice("");
    else setToChoice("");
  }, [choice, setFromChoice, setToChoice]);

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
          value={choice === "from" ? fromChoice : toChoice}
        >
          {choice === "from" ? (
            <MenuItem value="return">Return to services</MenuItem>
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
