import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { stepsOrder } from "../data/becomeAHost";
interface IProps {
  children: ReactNode;
}

const RedirectRoute = ({ children }: IProps) => {
  const location = useLocation();
  const userProgress = JSON.parse(localStorage.getItem("userProgress") || "[]");
  const currentStep = location.pathname.split("/").pop();
  if (!userProgress.includes(currentStep)) {
    const lastCompletedStep = stepsOrder
      .slice()
      .reverse()
      .find((step) => userProgress.includes(step));
    return <Navigate to={`/become-a-host/${lastCompletedStep}`} replace />;
  }
  return children;
};
export default RedirectRoute;
