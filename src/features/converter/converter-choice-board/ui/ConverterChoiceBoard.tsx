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
  choice: {
    type: "to" | "from";
    current: string;
    setCurrent: (value: string) => void;
  };
}

const ConverterChoiceBoard: FC<Props> = ({ setService, choice }) => {
  const { data, isLoading } = useGetAllBoardQuery(null);

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
      type="trello"
      order={choice.type === "from" ? "forward" : "reverse"}
    >
      <FormControl sx={{ width: "230px" }}>
        <InputLabel>Board</InputLabel>
        <Select
          label="Board"
          onChange={selectChange}
          MenuProps={{ style: { maxHeight: "300px" } }}
          value={choice.current}
        >
          {choice.type === "from" ? (
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
