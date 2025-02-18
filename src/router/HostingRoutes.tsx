import { Route } from "react-router-dom";
import ErrorHandler from "../components/errors/ErrorHandler";
import HostingLayout from "../layouts/HostingLayout";
import Hosting from "../pages/hosting";
import Listings from "../pages/hosting/Listings";
import Listing from "../pages/hosting/listing";

export const HostingRoutes = (
  <Route
    path="/hosting"
    element={<HostingLayout />}
    errorElement={<ErrorHandler />}
  >
    <Route index element={<Hosting />} />
    <Route path="listings" element={<Listings />} />
    <Route path="listings/:id" element={<Listing />} />
  </Route>
);
