import { Route } from "react-router-dom";
import ErrorHandler from "../components/errors/ErrorHandler";
import HostingLayout from "../layouts/HostingLayout";
import Hosting from "../pages/hosting";
import Properties from "../pages/hosting/Properties";
import Property from "../pages/hosting/Property";
import UpdateProperty from "../pages/hosting/updateProperty";

export const HostingRoutes = (
  <Route
    path="/hosting"
    element={<HostingLayout />}
    errorElement={<ErrorHandler />}
  >
    <Route index element={<Hosting />} />
    <Route path="properties" element={<Properties />} />
    <Route path="properties/:id" element={<Property />} />
    <Route path="properties/:id/update" element={<UpdateProperty />} />
  </Route>
);
