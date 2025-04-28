import ProtectedRoutes from "@/middleware/ProtectedRoutes";
import AccountSettings from "@/pages/accountSettings";
import Bookings from "@/pages/accountSettings/Bookings";
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
      path="account-settings/personal-info"
      element={
        <ProtectedRoutes>
          <PersonalInfo />
        </ProtectedRoutes>
      }
    />
    <Route
      path="account-settings/bookings"
      element={
        <ProtectedRoutes>
          <Bookings />
        </ProtectedRoutes>
      }
    />
    <Route
      path="account-settings/login-and-security"
      element={
        <ProtectedRoutes>
          <LoginAndSecurity />
        </ProtectedRoutes>
      }
    />
    <Route
      path="account-settings/preferences"
      element={
        <ProtectedRoutes>
          <Preferences />
        </ProtectedRoutes>
      }
    />
  </>
);
