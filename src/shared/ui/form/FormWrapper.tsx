import { Box, CircularProgress } from "@mui/material";

interface FormWrapperProps {
  children: React.ReactNode;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isLoading?: boolean;
  errorMessage?: string | null;
}

function FormWrapper({
  children,
  handleSubmit,
  isLoading,
  // errorMessage,
}: FormWrapperProps) {
  return (
    <Box component="form" onSubmit={handleSubmit} autoComplete="off" sx={{height: '100%'}}>
      {children}

      {/* Display loading state if isLoading is true */}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Display error message if errorMessage is not null */}
      {/* {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )} */}
    </Box>
  );
}

export default FormWrapper;
