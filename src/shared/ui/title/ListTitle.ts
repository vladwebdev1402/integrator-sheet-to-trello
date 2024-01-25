import { Typography, TypographyProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ListTitle = styled(Typography)<TypographyProps>((theme) => ({
    fontSize: "20px",
    fontWeight: "500",
    [theme.theme.breakpoints.down(768)]: {
        fontSize: "17px",
    },
}))
