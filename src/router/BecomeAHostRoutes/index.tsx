import { Route } from "react-router-dom";
import BecomeAHostLayout from "../../layouts/BecomeAHost";
import ErrorHandler from "../../components/errors/ErrorHandler";
import GetStartedToHost from "../../pages/becomeAHost";
import AboutYourPlaceRoutes from "./AboutYourPlaceRoutes";
import StandOutRoutes from "./StandOutRoutes";
import FinishSetupRoutes from "./FinishSetupRoutes";

export const BecomeAHostRoutes = (
  <Route
    path="/become-a-host"
    element={<BecomeAHostLayout />}
    errorElement={<ErrorHandler />}
  >
    <Route index element={<GetStartedToHost />} />
    {AboutYourPlaceRoutes}
    {StandOutRoutes}
    {FinishSetupRoutes}
  </Route>
);
