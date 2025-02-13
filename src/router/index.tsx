import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RootRoutes } from "./RootRoutes";
import { DashboardRoutes } from "./DashboardRoutes";
import { BecomeAHostRoutes } from "./BecomeAHostRoutes";
import { HostingRoutes } from "./HostingRoutes";
import Layout from "../layouts/Layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      {RootRoutes}
      {DashboardRoutes}
      {BecomeAHostRoutes}
      {HostingRoutes}
    </Route>
  )
);

export default router;
