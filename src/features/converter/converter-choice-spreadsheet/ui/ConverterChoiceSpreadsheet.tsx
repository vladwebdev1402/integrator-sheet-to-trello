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
  choice: {
    type: "to" | "from";
    current: string;
    setCurrent: (value: string) => void;
  };
}

const ConverterChoiceSpreadsheet: FC<Props> = ({ setService, choice }) => {
  const { data, isLoading } = useGetAllSheetsQuery({ limit: 150, name: "" });

  const selectChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    if (value === "return") setService("");
    else choice.setCurrent(value);
  };

  useEffect(() => {
    choice.setCurrent("");
  }, []);

  return (
    <ConverterSelectBox
      type="spredsheet"
      order={choice.type === "from" ? "forward" : "reverse"}
    >
      <FormControl sx={{ width: "230px" }}>
        <InputLabel>Spreadsheet</InputLabel>
        <Select
          label="Spreadsheet"
          onChange={selectChange}
          MenuProps={{ style: { maxHeight: "300px" } }}
          value={choice.current}
        >
          {choice.type === "from" ? (
            <MenuItem value="return">Return to services</MenuItem>
          ) : (
            <MenuItem value="create">Create new spreadsheet</MenuItem>
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
