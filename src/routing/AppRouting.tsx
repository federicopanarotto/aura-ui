import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AuthUserGuard from "./guards/AuthUserGuard";
import HomePage from "../pages/Home/HomePage";
import Layout from "../shared/ui/layout/Layout";
import LoginPage from "../pages/Login/LoginPage";

function AppRouting() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<AuthUserGuard />}>
          <Route element={<Layout />}>
            <Route path="/*" element={<Navigate to="/" />} />
            <Route index path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouting;
