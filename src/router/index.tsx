import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RootRoutes } from "./rootRoutes";
import { DashboardRoutes } from "./DashboardRoutes";
import { HostingRoutes } from "./HostingRoutes";
import Layout from "../layouts/Layout";
import { BecomeAHostRoutes } from "./becomeHostRoutes";
import ErrorHandler from "@/components/errors/ErrorHandler";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<ErrorHandler />}>
      {RootRoutes}
      {BecomeAHostRoutes}
      {HostingRoutes}
      {DashboardRoutes}
    </Route>
  )
);

export default router;
