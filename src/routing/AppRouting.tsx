import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AuthUserGuard from "./guards/AuthUserGuard";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import Layout from "../shared/ui/layout/Layout";
import LoginPage from "../pages/Login/LoginPage";
import DiaryPage from "../pages/Diary/DiaryPage";
import RegistrationPage from "../pages/Registration/RegistrationPage";
import ReviewPage from "../pages/Review/ReviewPage";
import ProfilePage from "../pages/Profile/ProfilePage";

function AppRouting() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<AuthUserGuard />}>
          <Route element={<Layout />}>
            <Route path="/*" element={<Navigate to="/" />} />
            <Route index path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<DashboardPage />} />
            <Route path="/diary" element={<DiaryPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouting;
