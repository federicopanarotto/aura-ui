import type { ReactNode } from "react";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import InsertChartOutlinedOutlinedIcon from "@mui/icons-material/InsertChartOutlinedOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

export interface MenuItem {
  label: string;
  path: string;
  icon: ReactNode;
}

export const menuItems: MenuItem[] = [
  {
    label: "Home",
    path: "/home",
    icon: <GridViewOutlinedIcon sx={{ fontSize: 32 }} />,
  },
  {
    label: "Diary",
    path: "/diary",
    icon: <LibraryBooksOutlinedIcon sx={{ fontSize: 32}} />,
  },
  {
    label: "Registration",
    path: "/registration",
    icon: <RadioButtonCheckedIcon sx={{ fontSize: 48 }} />,
  },
  {
    label: "Review",
    path: "/review",
    icon: <InsertChartOutlinedOutlinedIcon sx={{ fontSize: 32 }} />,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <AccountBoxOutlinedIcon sx={{ fontSize: 32 }} />,
  },
];
