import { FormControl, Select, InputLabel } from "@mui/material";
import { ConverterSelectBox } from "@/shared/ui";

const DisableToChoiceSelect = () => {
  return (
    <ConverterSelectBox type="document" order="reverse">
      <FormControl sx={{ width: "230px" }} disabled>
        <InputLabel>First, select the service</InputLabel>
        <Select label="First, select the service"></Select>
      </FormControl>
    </ConverterSelectBox>
  );
};

export default DisableToChoiceSelect;
