import { Typography, Box } from "@mui/material";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
const CardMembersTitle = () => {
  return (
    <Box display="flex" gap="12px" alignItems="center">
      <Person2OutlinedIcon />
      <Typography variant="overline" fontWeight={500} fontSize="15px">
        Members
      </Typography>
    </Box>
  );
};

export default CardMembersTitle;
