import { Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";

export const DashboardRoutes = (
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<Dashboard />} />
  </Route>
);
