import { ReactNode } from "react";
import { useAppSelector } from "../store/hooks";
import { Navigate, useLocation } from "react-router-dom";
import { stepsOrder } from "../data/becomeAHost";

interface IProps {
  children: ReactNode;
}
const RedirectRoute = ({ children }: IProps) => {
  const { completedSteps } = useAppSelector((state) => state.becomeAHost);
  const location = useLocation();

  const currentPath = location.pathname;
  const currentStepIndex = stepsOrder.indexOf(currentPath);

  // Check if the current route is valid and not bypassing incomplete steps
  if (currentStepIndex !== -1) {
    const lastCompletedIndex = stepsOrder.findIndex(
      (step) => !completedSteps.includes(step)
    );

    if (lastCompletedIndex !== -1 && currentStepIndex > lastCompletedIndex) {
      // Redirect to the last completed step if trying to skip steps
      return <Navigate to={stepsOrder[lastCompletedIndex]} replace />;
    }
  }

  return <>{children}</>;
};

export default RedirectRoute;
