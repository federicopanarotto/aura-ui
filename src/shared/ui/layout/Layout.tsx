import { Box, LinearProgress } from "@mui/material";
import { useLoadingStorage } from "../../../storage/loadingStorage";
import { Outlet } from "react-router";

function Layout() {
  const { isLoading } = useLoadingStorage();

  return (
    <Box
      sx={{
        height: "calc(100dvh - 3px)",
        minHeight: 600,
        position: "relative",
      }}
    >
      <Box
        sx={{
          height: 3,
        }}
      >
        {isLoading && <LinearProgress />}
      </Box>
      <Outlet />
    </Box>
  );
}

export default Layout;
