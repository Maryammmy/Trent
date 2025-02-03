import { Route } from "react-router-dom";
import ErrorHandler from "../components/errors/ErrorHandler";
import HostingLayout from "../layouts/HostingLayout";
import ChoosePlace from "../pages/hosting/ChoosePlace";
import TypeOfPlace from "../pages/hosting/TypeOfPlace";
import LocationOfPlace from "../pages/hosting/LocationOfPlace";
import FloorPlan from "../pages/hosting/FloorPlan";
import GetStartedToHost from "../pages/hosting";

export const HostingRoutes = (
  <Route
    path="/hosting"
    element={<HostingLayout />}
    errorElement={<ErrorHandler />}
  >
    <Route index element={<GetStartedToHost />} />
    <Route path="choose-place" element={<ChoosePlace />} />
    <Route path="type-of-place" element={<TypeOfPlace />} />
    <Route path="location" element={<LocationOfPlace />} />
    <Route path="floor-plan" element={<FloorPlan />} />
  </Route>
);
