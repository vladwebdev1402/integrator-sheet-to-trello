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
  setToChoice: (value: string) => void;
}

const ConverterChoiceToSpreadsheet: FC<Props> = ({ setToChoice }) => {
  const selectChange = (e: SelectChangeEvent) => {
    setToChoice(e.target.value);
  };

  return (
    <ConverterSelectBox type="spredsheet" order="reverse">
      <FormControl sx={{ width: "230px" }}>
        <InputLabel>Spreedsheet</InputLabel>
        <Select
          label="Spreedsheet"
          onChange={selectChange}
          MenuProps={{ style: { maxHeight: "300px" } }}
        >
          <MenuItem value={"create"}>Create new spreadsheet</MenuItem>
          <MenuItem value={"spreadsheet1"}>spreadsheet1</MenuItem>
          <MenuItem value={"spreadsheet2"}>spreadsheet2</MenuItem>
          <MenuItem value={"spreadsheet3"}>spreadsheet3</MenuItem>
        </Select>
      </FormControl>
    </ConverterSelectBox>
  );
};

export default ConverterChoiceToSpreadsheet;
