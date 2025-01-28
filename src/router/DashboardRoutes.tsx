// DashboardRoutes.jsx
import { Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import ErrorHandler from "../components/errors/ErrorHandler";
import Dashboard from "../pages/Dashboard";

export const DashboardRoutes = (
  <Route
    path="/dashboard"
    element={<DashboardLayout />}
    errorElement={<ErrorHandler />}
  >
    <Route index element={<Dashboard />} />
  </Route>
);
