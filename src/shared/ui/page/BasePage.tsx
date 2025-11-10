import { Box, type SxProps, type Theme } from "@mui/material";
import { useEffect, type ReactNode } from "react";
import { useLoadingStorage } from "../../../storage/loadingStorage";

interface BasePageProps {
  children?: ReactNode;
  isLoading?: boolean;
  sx?: SxProps<Theme>;
}

function BasePage({ children, isLoading = false, sx }: BasePageProps) {
  const { setLoading } = useLoadingStorage();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <Box
      sx={{
        height: "100%",
        minHeight: 600,
        position: "relative",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default BasePage;
