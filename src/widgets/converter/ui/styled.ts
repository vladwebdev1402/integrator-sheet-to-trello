import {Box, BoxProps} from "@mui/material";
import {styled} from "@mui/material/styles";

export const ConverterContainer = styled(Box)<BoxProps>(() => ({
    marginTop:"64px",
}))


export const ConverterBody = styled(Box)<BoxProps>(() => ({
    display:"flex",
    justifyContent:"center",
    gap:"15px",
    marginTop:"64px",
    alignItems:"center",
}))
