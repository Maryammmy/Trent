import { Route } from "react-router-dom";
import ErrorHandler from "../components/errors/ErrorHandler";
import HostingLayout from "../layouts/HostingLayout";
import Hosting from "../pages/hosting";
import Properties from "../pages/hosting/Properties";
import Property from "../pages/hosting/Property";
import UpdateProperty from "../pages/hosting/updateProperty";
import ProtectedRoutes from "../middleware/ProtectedRoutes";

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
      path="properties/:id"
      element={
        <ProtectedRoutes>
          <Property />
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
  </Route>
);
