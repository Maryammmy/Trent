import { Route } from "react-router-dom";
import FinishSetup from "../../pages/becomeAHost/finishSetup";
import MinMaxDays from "../../pages/becomeAHost/finishSetup/MinMaxDays";
import PriceAndDeposit from "../../pages/becomeAHost/finishSetup/PriceAndDeposit";
import ProtectedRoutes from "../../middleware/ProtectedRoutes";
import GuestRulesAndCancellationPolicies from "@/pages/becomeAHost/finishSetup/GuestRulesAndCancellationPolicies";

export const FinishSetupRoutes = (
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
      path="price-and-deposit"
      element={
        <ProtectedRoutes>
          <PriceAndDeposit />
        </ProtectedRoutes>
      }
    />
    <Route
      path="guest-rules-and-cancellation-policies"
      element={
        <ProtectedRoutes>
          <GuestRulesAndCancellationPolicies />
        </ProtectedRoutes>
      }
    />
  </>
);
