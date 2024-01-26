import { Skeleton, Box } from "@mui/material";

const CommentSkeleton = () => {
  return (
    <Box maxWidth="460px">
      <Box display="flex" gap="12px">
        <Skeleton
          variant="circular"
          height="32px"
          width="32px"
          animation="wave"
        />
        <Box>
          <Skeleton
            variant="rectangular"
            width="90px"
            height="12px"
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            width="90px"
            height="12px"
            animation="wave"
            sx={{ marginTop: "6px" }}
          />
        </Box>
      </Box>
      <Skeleton
        variant="rectangular"
        width="100%"
        height="64px"
        animation="wave"
        sx={{ marginTop: "12px" }}
      />
    </Box>
  );
};

export default CommentSkeleton;
