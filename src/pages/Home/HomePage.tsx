import { Box, Typography, Button } from "@mui/material";
import BasePage from "../../shared/ui/page/BasePage";
import ThemeButton from "../../shared/ui/button/ThemeButton";
import { useState } from "react";
import { useMe } from "../../shared/api/user/useMe";

function HomePage() {
  const [loading, setLoading] = useState<boolean>(true);

  const { data: me, isLoading: isMeLoading } = useMe();

  const isLoading = loading || isMeLoading;

  return (
    <BasePage sx={{ p: 2 }} isLoading={isLoading}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h1">Aura UI</Typography>
        <ThemeButton />
      </Box>
      
      {/* Debug loading state */}
      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={() => setLoading(true)}>
          Start loading
        </Button>
        <Button variant="outlined" onClick={() => setLoading(false)}>
          Stop loading
        </Button>
      </Box>

      {/* User information */}
      <pre>
        {JSON.stringify(me, null, 2)}
      </pre>
    </BasePage>
  );
}

export default HomePage;
