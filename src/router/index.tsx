import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { RootRoutes } from "./RootRoutes";
import { DashboardRoutes } from "./DashboardRoutes";
import { BecomeAHostRoutes } from "./BecomeAHostRoutes";
import { HostingRoutes } from "./HostingRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {RootRoutes}
      {DashboardRoutes}
      {BecomeAHostRoutes}
      {HostingRoutes}
    </>
  )
);

export default router;
