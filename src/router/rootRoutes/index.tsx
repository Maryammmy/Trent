import { Route } from "react-router-dom";
import RootLayout from "../../layouts";
import ErrorHandler from "../../components/errors/ErrorHandler";
import NotFoundPage from "../../pages/NotFoundPage";
import Gallery from "../../pages/property/Gallery";
import LandingPage from "../../pages";
import { AccountSettingsRoutes } from "./AccountSettingRoutes";
import { PropertyRoutes } from "./PropertyRoutes";
import { TermsRoutes } from "./TermsRoutes";

export const RootRoutes = (
  <>
    <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
      <Route index element={<LandingPage />} />
      {PropertyRoutes}
      {AccountSettingsRoutes}
      {TermsRoutes}
      <Route path="*" element={<NotFoundPage />} />
    </Route>
    <Route path="properties/:id/gallery" element={<Gallery />} />
  </>
);
<Route />;
