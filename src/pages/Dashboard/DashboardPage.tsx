import { Box, Typography, Stack } from "@mui/material";
import BasePage from "../../shared/ui/page/BasePage";
import ThemeButton from "../../shared/ui/button/ThemeButton";
import UserInfoCardDebug from "../../shared/ui/debug/UserInfoCardDebug";
import LoadingStateButtonsDebug from "../../shared/ui/debug/LoadingStateButtonsDebug";

function DashboardPage() {
  return (
    <BasePage sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h1">Aura UI</Typography>
        <ThemeButton />
      </Box>
      
      {/* Debug loading state and user */}
      <Stack spacing={2}>
        <LoadingStateButtonsDebug />
        <UserInfoCardDebug />
      </Stack>
      
    </BasePage>
  );
}

export default DashboardPage;
