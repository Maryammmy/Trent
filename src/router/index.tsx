import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RootRoutes } from "./rootRoutes";
import { DashboardRoutes } from "./DashboardRoutes";
import { BecomeAHostRoutes } from "./becomeAHostRoutes";
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
