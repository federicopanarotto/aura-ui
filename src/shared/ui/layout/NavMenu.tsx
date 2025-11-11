import { Card, IconButton, Tooltip } from "@mui/material";
import { menuItems } from "./NavItems";
import { NavLink } from "react-router";

function NavMenu() {
  return (
    <Card
      elevation={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        px: 3,
        py: 1,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      {menuItems.map((item) => (
        <Tooltip key={item.path} title={item.label}>
          <IconButton
            component={NavLink}
            to={item.path}
            sx={{
              color: (theme) => theme.palette.text.secondary,
              "&.active": {
                color: (theme) => theme.palette.primary.main,
                backgroundColor: (theme) =>
                  theme.palette.action.selected,
              },
            }}
          >
            {item.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Card>
  );
}

export default NavMenu;
