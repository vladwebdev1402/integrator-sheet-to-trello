import { FC } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  InputLabel,
} from "@mui/material";

import { ConverterSelectBox } from "@/shared/ui";
import { TServiceChoice } from "@/shared/types";

interface Props {
  setService: (value: TServiceChoice) => void;
  service: TServiceChoice;
}

const ConverterChoiceService: FC<Props> = ({ setService, service }) => {
  const selectChange = (e: SelectChangeEvent) => {
    setService(e.target.value as TServiceChoice);
  };

  return (
    <ConverterSelectBox type="document">
      <FormControl sx={{ width: "230px" }}>
        <InputLabel>Service</InputLabel>
        <Select
          label="Service"
          onChange={selectChange}
          MenuProps={{ style: { maxHeight: "300px" } }}
          value={service}
        >
          {/* <MenuItem value="google">Google</MenuItem> */}
          <MenuItem value="trello">Trello</MenuItem>
        </Select>
      </FormControl>
    </ConverterSelectBox>
  );
};

export default ConverterChoiceService;
