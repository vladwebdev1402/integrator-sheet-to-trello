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

const ConverteChoiceToBoard: FC<Props> = ({ setToChoice }) => {
  const selectChange = (e: SelectChangeEvent) => {
    setToChoice(e.target.value);
  };

  return (
    <ConverterSelectBox type="trello" order="reverse">
      <FormControl sx={{ width: "230px" }}>
        <InputLabel>Board</InputLabel>
        <Select
          onChange={selectChange}
          label="Board"
          MenuProps={{ style: { maxHeight: "300px" } }}
        >
          <MenuItem value="create">Create new board</MenuItem>
          <MenuItem value="board1">board1</MenuItem>
          <MenuItem value="board2">board2</MenuItem>
          <MenuItem value="board3">board3</MenuItem>
        </Select>
      </FormControl>
    </ConverterSelectBox>
  );
};

export default ConverteChoiceToBoard;
