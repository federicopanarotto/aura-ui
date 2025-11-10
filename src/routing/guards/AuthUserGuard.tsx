import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import PageLoading from "../../shared/ui/page/PageLoading";

function AuthUserGuard() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />
}

export default AuthUserGuard;
