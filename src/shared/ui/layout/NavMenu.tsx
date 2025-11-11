import { Box, Card, Menu, MenuItem } from "@mui/material";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';

function NavMenu() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Card>
        <Menu
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={true}
        >
          <MenuItem>
            <GridViewOutlinedIcon />
          </MenuItem>
          <MenuItem>
            <LibraryBooksOutlinedIcon />
          </MenuItem>
          <MenuItem>
            <CircleOutlinedIcon sx={{ fontSize: 40 }} />
          </MenuItem>
          <MenuItem>
            <InsertChartOutlinedOutlinedIcon />
          </MenuItem>
          <MenuItem>
            <AccountBoxOutlinedIcon />
          </MenuItem>
        </Menu>
      </Card>
    </Box>
  );
}

export default NavMenu;
