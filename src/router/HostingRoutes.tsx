
import { Route } from "react-router-dom";
import ErrorHandler from "../components/errors/ErrorHandler";
import HostingLayout from "../layouts/HostingLayout";
import ChoosePlace from "../pages/hosting/ChoosePLace";

export const HostingRoutes = (
  <Route
    path="/hosting"
    element={<HostingLayout/>}
    errorElement={<ErrorHandler />}
  >
    <Route index element={<ChoosePlace/>} />
    <Route path="choose-place" element={<ChoosePlace/>} />
  </Route>
);
