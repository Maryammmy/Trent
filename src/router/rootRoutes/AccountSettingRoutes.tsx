import ProtectedRoutes from "@/middleware/ProtectedRoutes";
import AccountSettings from "@/pages/accountSettings";
import LoginAndSecurity from "@/pages/accountSettings/LoginAndSecurity";
import PersonalInfo from "@/pages/accountSettings/PersonalInfo";
import Preferences from "@/pages/accountSettings/Preferences";
import { Route } from "react-router-dom";

export const AccountSettingsRoutes = (
  <>
    <Route
      path="account-settings"
      element={
        <ProtectedRoutes>
          <AccountSettings />
        </ProtectedRoutes>
      }
    />
    <Route
      path="personal-info"
      element={
        <ProtectedRoutes>
          <PersonalInfo />
        </ProtectedRoutes>
      }
    />
    <Route
      path="login-and-security"
      element={
        <ProtectedRoutes>
          <LoginAndSecurity />
        </ProtectedRoutes>
      }
    />
    <Route
      path="preferences"
      element={
        <ProtectedRoutes>
          <Preferences />
        </ProtectedRoutes>
      }
    />
  </>
);
