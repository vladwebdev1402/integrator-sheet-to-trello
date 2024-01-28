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
import { useGetAllBoardQuery } from "@/entities/trello-board";
import NameBoard from "./NameBoard";

interface Props {
  setService: (value: TServiceChoice) => void;
  setFromChoice: (value: string) => void;
  setToChoice: (value: string) => void;
  toChoice: string;
  fromChoice: string;
  choice: "to" | "from";
}

const ConverterChoiceBoard: FC<Props> = ({
  setService,
  setFromChoice,
  setToChoice,
  toChoice,
  fromChoice,
  choice,
}) => {
  const { data, isLoading } = useGetAllBoardQuery(null);

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
      type="trello"
      order={choice === "from" ? "forward" : "reverse"}
    >
      <FormControl sx={{ width: "230px" }}>
        <InputLabel>Board</InputLabel>
        <Select
          label="Board"
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
          {data && data.idBoards.length === 0 && (
            <MenuItem disabled>Workspace is empty</MenuItem>
          )}
          {data &&
            data.idBoards.map((id) => (
              <MenuItem value={id} key={id}>
                <NameBoard id={id} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </ConverterSelectBox>
  );
};

export default ConverterChoiceBoard;
