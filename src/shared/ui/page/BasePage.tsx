import { Box, type BoxProps } from "@mui/material";
import { useEffect, type ReactNode } from "react";
import { useLoadingStorage } from "../../../storage/loadingStorage";

interface BasePageProps extends BoxProps {
  children?: ReactNode;
  isLoading?: boolean;
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
        minHeight: 500,
        position: "relative",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default BasePage;
