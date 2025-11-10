import { Box, Typography } from "@mui/material";
import BasePage from "../../shared/ui/page/BasePage";
import ThemeButton from "../../shared/ui/button/ThemeButton";

function HomePage() {
  return (
    <BasePage sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h1">Aura UI</Typography>
        <ThemeButton />
      </Box>
    </BasePage>
  );
}

export default HomePage;
