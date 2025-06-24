import { Route } from "react-router-dom";
import HostingLayout from "../layouts/HostingLayout";
import Hosting from "../pages/hosting";
import Properties from "../pages/hosting/properties";
import ProtectedRoutes from "../middleware/ProtectedRoutes";
import Payout from "@/pages/payouts";
import PayoutsRequest from "@/pages/payouts/PayoutsRequest";
import PayoutProfiles from "@/pages/payouts/PayoutProfiles";
import CreatePayoutProfile from "@/pages/payouts/CreatePayoutProfile";
import Bookings from "@/pages/hosting/bookings";
import Booking from "@/pages/hosting/bookings/Booking";
import UpdateProperty from "@/pages/hosting/properties/UpdateProperty";

export const HostingRoutes = (
  <Route path="/hosting" element={<HostingLayout />}>
    <Route
      index
      element={
        <ProtectedRoutes>
          <Hosting />
        </ProtectedRoutes>
      }
    />
    <Route
      path="properties"
      element={
        <ProtectedRoutes>
          <Properties />
        </ProtectedRoutes>
      }
    />
    <Route
      path="properties/:id/update"
      element={
        <ProtectedRoutes>
          <UpdateProperty />
        </ProtectedRoutes>
      }
    />
    <Route
      path="bookings"
      element={
        <ProtectedRoutes>
          <Bookings />
        </ProtectedRoutes>
      }
    />
    <Route
      path="bookings/:id"
      element={
        <ProtectedRoutes>
          <Booking />
        </ProtectedRoutes>
      }
    />
    <Route
      path="payouts"
      element={
        <ProtectedRoutes>
          <Payout />
        </ProtectedRoutes>
      }
    />
    <Route
      path="payouts/profiles"
      element={
        <ProtectedRoutes>
          <PayoutProfiles />
        </ProtectedRoutes>
      }
    />
    <Route
      path="payouts/create-profile"
      element={
        <ProtectedRoutes>
          <CreatePayoutProfile />
        </ProtectedRoutes>
      }
    />
    <Route
      path="payouts/request"
      element={
        <ProtectedRoutes>
          <PayoutsRequest />
        </ProtectedRoutes>
      }
    />
  </Route>
);
