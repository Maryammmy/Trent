import { Route } from "react-router-dom";
import ErrorHandler from "../components/errors/ErrorHandler";
import HostingLayout from "../layouts/HostingLayout";
import Hosting from "../pages/hosting";
import Properties from "../pages/hosting/properties";
import ProtectedRoutes from "../middleware/ProtectedRoutes";
import UpdateProperty from "@/pages/hosting/properties/updateProperty";
import Payout from "@/pages/payout";
import PayoutProfile from "@/pages/payout/PayoutProfile";

export const HostingRoutes = (
  <Route
    path="/hosting"
    element={<HostingLayout />}
    errorElement={<ErrorHandler />}
  >
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
      path="payouts/profile"
      element={
        <ProtectedRoutes>
          <PayoutProfile />
        </ProtectedRoutes>
      }
    />
  </Route>
);
