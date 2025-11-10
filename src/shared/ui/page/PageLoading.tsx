import { Box, CircularProgress } from "@mui/material";

function PageLoading() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100dvh",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default PageLoading;
