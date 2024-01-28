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

const ConverterChoiceBoard: FC<Props> = ({ setService, setFromChoice }) => {
  const selectChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    if (value === "document") setService(value);
    else setFromChoice(value);
  };

  return (
    <ConverterSelectBox type="trello">
      <FormControl sx={{ width: "230px" }}>
        <InputLabel>Board</InputLabel>
        <Select
          label="Board"
          onChange={selectChange}
          MenuProps={{ style: { maxHeight: "300px" } }}
        >
          <MenuItem value="document">Return to services</MenuItem>
          <MenuItem value="board1">board1</MenuItem>
          <MenuItem value="board2">board2</MenuItem>
          <MenuItem value="board3">board3</MenuItem>
        </Select>
      </FormControl>
    </ConverterSelectBox>
  );
};

export default ConverterChoiceBoard;
