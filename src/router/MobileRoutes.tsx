import Android from "@/pages/Android";
import Ios from "@/pages/Ios";
import { Route } from "react-router-dom";

export const MobileRoutes = (
  <>
    <Route path="android" element={<Android />} />
    <Route path="ios" element={<Ios />} />
  </>
);
