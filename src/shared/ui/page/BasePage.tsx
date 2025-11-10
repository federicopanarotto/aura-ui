import { Box, type SxProps, type Theme } from "@mui/material";
import type { ReactNode } from "react";

interface BasePageProps {
  children?: ReactNode;
  sx?: SxProps<Theme>;
}

function BasePage({ children, sx }: BasePageProps) {
  return (
    <Box
      sx={{
        height: "100vh",
        minHeight: 600,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default BasePage;
