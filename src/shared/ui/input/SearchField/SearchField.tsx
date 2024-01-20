import React, { FC } from "react";
import { TextField, SxProps, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  placeholder: string;
  sx?: SxProps;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const SearchField: FC<Props> = ({
  placeholder,
  sx = {},
  onChange = () => {},
  value = "",
}) => {
  return (
    <TextField
      sx={{ ...sx }}
      fullWidth
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchField;
