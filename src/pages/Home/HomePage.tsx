import { Box, Typography } from "@mui/material";
import BasePage from "../../shared/ui/page/BasePage";

function HomePage() {
  return (
    <BasePage sx={{ p: 2 }}>
      <Box>
        <Typography variant="h1">Aura UI</Typography>
      </Box>
    </BasePage>
  );
}

export default HomePage;
