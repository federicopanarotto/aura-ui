import { Box, Typography, Button } from "@mui/material";
import BasePage from "../../shared/ui/page/BasePage";
import ThemeButton from "../../shared/ui/button/ThemeButton";
import { useState } from "react";

function HomePage() {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <BasePage sx={{ p: 2 }} isLoading={loading}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h1">Aura UI</Typography>
        <ThemeButton />
      </Box>
      
      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={() => setLoading(true)}>
          Start loading
        </Button>
        <Button variant="outlined" onClick={() => setLoading(false)}>
          Stop loading
        </Button>
      </Box>
    </BasePage>
  );
}

export default HomePage;
