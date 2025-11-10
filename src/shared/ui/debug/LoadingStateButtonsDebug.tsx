import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoadingStorage } from "../../../storage/loadingStorage";

function LoadingStateButtonsDebug() {
  const [loading, setLoading] = useState<boolean>(false);
  const { setLoading: setLoadingStorage } = useLoadingStorage();

  useEffect(() => {
    setLoadingStorage(loading);
  }, [loading]);

  return (
    <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
      <Button variant="contained" onClick={() => setLoading(true)}>
        Start loading
      </Button>
      <Button variant="outlined" onClick={() => setLoading(false)}>
        Stop loading
      </Button>
    </Box>
  );
}

export default LoadingStateButtonsDebug;
