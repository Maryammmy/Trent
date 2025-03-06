import { Route } from "react-router-dom";
import RedirectRoute from "../../middleware/RedirectRoute";
import FinishSetup from "../../pages/becomeAHost/finishSetup";
import MinMaxDays from "../../pages/becomeAHost/finishSetup/MinMaxDays";
import GuestRules from "../../pages/becomeAHost/finishSetup/GuestRules";
import PriceAndDeposit from "../../pages/becomeAHost/finishSetup/PriceAndDeposit";

const FinishSetupRoutes = (
  <>
    <Route path="finish-setup" element={<FinishSetup />} />
    <Route
      path="min-and-max-days"
      element={
        <RedirectRoute>
          <MinMaxDays />
        </RedirectRoute>
      }
    />
    <Route
      path="guest-rules"
      element={
        <RedirectRoute>
          <GuestRules />
        </RedirectRoute>
      }
    />
    <Route
      path="price-and-deposit"
      element={
        <RedirectRoute>
          <PriceAndDeposit />
        </RedirectRoute>
      }
    />
  </>
);

export default FinishSetupRoutes;
