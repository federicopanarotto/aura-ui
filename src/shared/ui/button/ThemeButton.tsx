import { IconButton } from "@mui/material";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useThemeStorage } from "../../../storage/themeStorage";

function ThemeButton() {
  const { mode, toggleTheme } = useThemeStorage();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === "light" ? <DarkModeOutlinedIcon /> : <WbSunnyOutlinedIcon />}
    </IconButton>
  );
}

export default ThemeButton;
