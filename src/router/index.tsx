import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { RootRoutes } from "./RootRoutes";
import { DashboardRoutes } from "./DashboardRoutes";
import { HostingRoutes } from "./HostingRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {RootRoutes}
      {DashboardRoutes}
      {HostingRoutes}
    </>
  )
);

export default router;
