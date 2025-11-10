import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AuthUserGuard from "./guards/AuthUserGuard";
import HomePage from "../pages/Home/HomePage";

function AppRouting() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<>Login Page</>} />

        <Route element={<AuthUserGuard />}>
          <Route path="/*" element={<Navigate to="/" />} />
          <Route index path="/" element={<Navigate to="/home" />} />

          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouting;
