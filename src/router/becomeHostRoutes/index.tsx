import { Route } from "react-router-dom";
import BecomeAHostLayout from "../../layouts/BecomeAHost";
import GetStartedToHost from "../../pages/becomeAHost";
import { AboutYourPlaceRoutes } from "./AboutYourPlaceRoutes";
import { FinishSetupRoutes } from "./FinishSetupRoutes";
import { StandOutRoutes } from "./StandOutRoutes";

export const BecomeAHostRoutes = (
  <Route
    path="/become-a-host"
    element={<BecomeAHostLayout />}
  >
    <Route index element={<GetStartedToHost />} />
    {AboutYourPlaceRoutes}
    {StandOutRoutes}
    {FinishSetupRoutes}
  </Route>
);
