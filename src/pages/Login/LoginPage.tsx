import { Container, Stack } from "@mui/material";
import LoginForm from "./components/LoginForm";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

function LoginPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleNavigatHome = () => {
    navigate("/", { replace: true });
    return null;
  };

  useEffect(() => {
    if (isAuthenticated) {
      handleNavigatHome();
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container>
      <Stack
        sx={{ height: "90vh", justifyContent: "center", alignItems: "center" }}
        spacing={4}
      >
        <LoginForm successLogin={handleNavigatHome} />
      </Stack>
    </Container>
  );
}

export default LoginPage;
