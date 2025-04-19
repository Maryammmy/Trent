import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RootRoutes } from "./rootRoutes";
import { DashboardRoutes } from "./DashboardRoutes";
import { HostingRoutes } from "./HostingRoutes";
import Layout from "../layouts/Layout";
import { BecomeAHostRoutes } from "./becomeAHostRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      {RootRoutes}
      {BecomeAHostRoutes}
      {HostingRoutes}
      {DashboardRoutes}
    </Route>
  )
);

export default router;
