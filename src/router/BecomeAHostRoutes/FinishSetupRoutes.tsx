import { Route } from "react-router-dom";
import FinishSetup from "../../pages/becomeAHost/finishSetup";
import MinMaxDays from "../../pages/becomeAHost/finishSetup/MinMaxDays";
import GuestRules from "../../pages/becomeAHost/finishSetup/GuestRules";
import PriceAndDeposit from "../../pages/becomeAHost/finishSetup/PriceAndDeposit";
import ProtectedRoutes from "../../middleware/ProtectedRoutes";

const FinishSetupRoutes = (
  <>
    <Route path="finish-setup" element={<FinishSetup />} />
    <Route
      path="min-and-max-days"
      element={
        <ProtectedRoutes>
          <MinMaxDays />
        </ProtectedRoutes>
      }
    />
    <Route
      path="guest-rules"
      element={
        <ProtectedRoutes>
          <GuestRules />
        </ProtectedRoutes>
      }
    />
    <Route
      path="price-and-deposit"
      element={
        <ProtectedRoutes>
          <PriceAndDeposit />
        </ProtectedRoutes>
      }
    />
  </>
);

export default FinishSetupRoutes;
