import { createTheme, type Theme } from "@mui/material";

const baseTheme = {
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
};

export const lightTheme: Theme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
  },
});

export const darkTheme: Theme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
  },
});

export const globalTheme = (mode: 'light' | 'dark'): Theme => {
  return mode === 'light' ? lightTheme : darkTheme;
};