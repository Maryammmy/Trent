import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { RootRoutes } from "./RootRoutes";
import { DashboardRoutes } from "./DashboardRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {RootRoutes}
      {DashboardRoutes}
    </>
  )
);

export default router;
