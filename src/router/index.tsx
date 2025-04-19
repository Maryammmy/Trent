import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RootRoutes } from "./rootRoutes";
import { DashboardRoutes } from "./DashboardRoutes";
import { HostingRoutes } from "./HostingRoutes";
import Layout from "../layouts/Layout";
import { BecomeHostRoutes } from "./becomeAHostRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      {RootRoutes}
      {BecomeHostRoutes}
      {HostingRoutes}
      {DashboardRoutes}
    </Route>
  )
);

export default router;
