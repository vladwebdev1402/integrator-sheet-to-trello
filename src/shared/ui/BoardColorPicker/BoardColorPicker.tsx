import React, { FC } from "react";
import { IconButton, Box } from "@mui/material";
import { buttons } from "./buttons";
import CheckIcon from "@mui/icons-material/Check";

interface Props {
  currentValue: string;
  setCurrentValue: (value: string) => void;
}

const BoardColorPicker: FC<Props> = ({ currentValue, setCurrentValue }) => {
  return (
    <Box marginTop="10px" display="flex" gap="10px" flexWrap="wrap">
      {buttons.map((btn) => (
        <IconButton
          key={btn.value}
          sx={{
            padding: "0",
            minWidth: "40px",
            width: "40px",
            height: "40px",
            borderRadius: "6px",
            transition: ".3s",
            opacity: currentValue === btn.value ? "0.5" : "1",
            backgroundColor: btn.color,
            "&.MuiIconButton-root:hover": {
              bgcolor: btn.color,
              opacity: "0.5",
            },
          }}
          onClick={() => setCurrentValue(btn.value)}
        >
          {currentValue === btn.value ? (
            <CheckIcon htmlColor={"white"} />
          ) : (
            <></>
          )}
        </IconButton>
      ))}
    </Box>
  );
};

export default BoardColorPicker;
