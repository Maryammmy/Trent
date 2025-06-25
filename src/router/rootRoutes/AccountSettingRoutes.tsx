import ProtectedRoutes from "@/middleware/ProtectedRoutes";
import AccountSettings from "@/pages/accountSettings";
import Bookings from "@/pages/accountSettings/bookings";
import Booking from "@/pages/accountSettings/bookings/Booking";
import Payment from "@/pages/accountSettings/bookings/Payment";
import Credits from "@/pages/accountSettings/Credits";
import PersonalInfo from "@/pages/accountSettings/PersonalInfo";
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
      path="account-settings/bookings/:id"
      element={
        <ProtectedRoutes>
          <Booking />
        </ProtectedRoutes>
      }
    />
    <Route
      path="account-settings/bookings/payment/:id"
      element={
        <ProtectedRoutes>
          <Payment />
        </ProtectedRoutes>
      }
    />
    <Route
      path="account-settings/credits"
      element={
        <ProtectedRoutes>
          <Credits />
        </ProtectedRoutes>
      }
    />
  </>
);
