import { Route } from "react-router-dom";
import HostingLayout from "../layouts/HostingLayout";
import Hosting from "../pages/hosting";
import Properties from "../pages/hosting/properties";
import ProtectedRoutes from "../middleware/ProtectedRoutes";
import UpdateProperty from "@/pages/hosting/properties/updateProperty";
import Payout from "@/pages/payouts";
import PayoutRequest from "@/pages/payouts/PayoutRequest";
import PayoutProfiles from "@/pages/payouts/PayoutProfiles";
import CreatePayoutProfile from "@/pages/payouts/CreatePayoutProfile";

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
          <PayoutRequest />
        </ProtectedRoutes>
      }
    />
  </Route>
);
