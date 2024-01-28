import { FC } from "react";
import {
  FormControl,
  Select,
  SelectChangeEvent,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { ConverterSelectBox } from "@/shared/ui";

interface Props {
  setService: (value: string) => void;
  setFromChoice: (value: string) => void;
}

const ConverterChoiceSpreadsheet: FC<Props> = ({
  setFromChoice,
  setService,
}) => {
  const selectChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    if (value === "document") setService(value);
    else setFromChoice(value);
  };

  return (
    <ConverterSelectBox type="spredsheet">
      <FormControl sx={{ width: "230px" }}>
        <InputLabel>Spreadsheet</InputLabel>
        <Select
          label="Spreadsheet"
          onChange={selectChange}
          MenuProps={{ style: { maxHeight: "300px" } }}
        >
          <MenuItem value={"document"}>Return to services</MenuItem>
          <MenuItem value={"spreadsheet1"}>spreadsheet1</MenuItem>
          <MenuItem value={"spreadsheet2"}>spreadsheet2</MenuItem>
          <MenuItem value={"spreadsheet3"}>spreadsheet3</MenuItem>
        </Select>
      </FormControl>
    </ConverterSelectBox>
  );
};

export default ConverterChoiceSpreadsheet;
