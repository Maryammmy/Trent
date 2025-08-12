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
import { TermsRoutes } from "./TermsAndConditionsRoutes";
import { MobileRoutes } from "./MobileRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<ErrorHandler />}>
      {RootRoutes}
      {BecomeAHostRoutes}
      {HostingRoutes}
      {TermsRoutes}
      {MobileRoutes}
      {DashboardRoutes}
    </Route>
  )
);

export default router;
