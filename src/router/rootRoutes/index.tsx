import { Route } from "react-router-dom";
import RootLayout from "../../layouts";
import NotFoundPage from "../../pages/NotFoundPage";
import Gallery from "../../pages/property/Gallery";
import LandingPage from "../../pages";
import { AccountSettingsRoutes } from "./AccountSettingRoutes";
import { PropertyRoutes } from "./PropertyRoutes";

export const RootRoutes = (
  <>
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LandingPage />} />
      {PropertyRoutes}
      {AccountSettingsRoutes}
      <Route path="*" element={<NotFoundPage />} />
    </Route>
    <Route path="properties/:id/gallery" element={<Gallery />} />
  </>
);
