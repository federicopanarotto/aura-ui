import { Box, LinearProgress } from "@mui/material";
import { useLoadingStorage } from "../../../storage/loadingStorage";
import { Outlet } from "react-router";
import NavMenu from "./NavMenu";

function Layout() {
  const { isLoading } = useLoadingStorage();

  return (
    <Box
      sx={{
        height: "calc(100dvh - 900px)",
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
      <NavMenu />
    </Box>
  );
}

export default Layout;
