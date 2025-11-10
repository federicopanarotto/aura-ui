import { Button } from "@mui/material";
import { useAuth } from "../../../contexts/AuthContext";

function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button variant="outlined" onClick={() => logout()}>
      Logout
    </Button>
  );
}

export default LogoutButton;
