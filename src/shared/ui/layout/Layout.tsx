import { Box, LinearProgress } from "@mui/material";
import { useLoadingStorage } from "../../../storage/loadingStorage";
import { Outlet } from "react-router";
import NavMenu from "./NavMenu";

function Layout() {
  const { isLoading } = useLoadingStorage();

  return (
    <Box
      sx={{
        height: "100dvh",
        minHeight: 300,
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
      <Box sx={{overflowY: "auto", height: "calc(100dvh - 83px)"}}>
        <Outlet />
      </Box>
      <NavMenu />
    </Box>
  );
}

export default Layout;
